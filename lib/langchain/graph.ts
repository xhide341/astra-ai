import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { StateGraph } from "@langchain/langgraph";
import { MemorySaver, Annotation, messagesStateReducer} from "@langchain/langgraph";
import { teacherModel, facilitatorModel } from "./model";
import { teacherPersona, facilitatorPersona } from "./personas";
import { trimMessages } from "@langchain/core/messages";
import { saveMessage } from "@/actions/chat/save-message";
import { StreamChunk } from "@/types/chat";

const TOTAL_GRAPH_ITERATIONS = 4;

const config = {
    configurable: {
      thread_id: "stream_events",
    },
    version: "v2" as const,
  };

// Define state structure
const StateAnnotation = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
        reducer: messagesStateReducer,
    }),
    iteration: Annotation<number>({
        default: () => 0,
        reducer: (prev) => {
            // Ensure we don't exceed TOTAL_GRAPH_ITERATIONS
            const next = prev + 0.5;
            return Math.min(next, TOTAL_GRAPH_ITERATIONS);
        }
    }),
    history: Annotation<BaseMessage[]>({
        default: () => [],
        reducer: (prev, curr) => [...prev, ...curr]
    }),
    chatId: Annotation<string>({
        default: () => "",
        reducer: (_, curr) => curr
    })
});

// Configure message trimmer with stricter settings
const messageTrimmer = trimMessages({
    maxTokens: 3000,
    strategy: "last",
    tokenCounter: (text) => Math.ceil(text.length / 4),
    includeSystem: true,
    allowPartial: false,
    startOn: "human"
});

// Teacher node with trimming
async function teacherNode(state: typeof StateAnnotation.State) {
    console.log(`🎓 Teacher Turn (Iteration ${state.iteration})`);
    
    const trimmedMessages = await messageTrimmer.invoke(state.messages);
    console.log("🔍 Window Messages:", {
        original: state.messages.length,
        trimmed: trimmedMessages.length,
        window: "Last " + 4 + " messages kept"
    });
    
    const lastMessage = trimmedMessages[trimmedMessages.length - 1].content;
    
    const formattedPrompt = await teacherPersona.formatMessages({
        input: String(lastMessage)
    });
    
    const response = await teacherModel.invoke(formattedPrompt);

    return { 
        messages: [...state.messages, new AIMessage({ 
            content: response.content,
        })],
        iteration: state.iteration + 0.5
    };
}

// Facilitator node with trimming
async function facilitatorNode(state: typeof StateAnnotation.State) {
    console.log(`💬 Facilitator Turn (Iteration ${state.iteration})`);
    
    const trimmedMessages = await messageTrimmer.invoke(state.messages);
    console.log("🔍 Window Messages:", {
        original: state.messages.length,
        trimmed: trimmedMessages.length,
        window: "Last " + 4 + " messages kept"
    });
    const teacherMessage = trimmedMessages[trimmedMessages.length - 1].content;
    
    // Add flag for final iteration
    const isFinalIteration = state.iteration + 0.5 >= TOTAL_GRAPH_ITERATIONS;
    const inputMessage = isFinalIteration 
        ? `This is the final response. End the conversation gracefully. "${teacherMessage}"`
        : `Provide a response to the teacher's explanation: "${teacherMessage}"`;
    
    const formattedPrompt = await facilitatorPersona.formatMessages({
        input: inputMessage
    }); 

    const response = await facilitatorModel.invoke(formattedPrompt);

    console.log(`✅ Facilitator Complete (Iteration ${state.iteration})`);
    return { 
        messages: [...state.messages, new AIMessage({ 
            content: response.content,
        })],
        iteration: state.iteration + 0.5
    };
}

// Define when to continue or end conversation
function shouldContinue(state: typeof StateAnnotation.State): "__end__" | "teacher" {
    // Force end when we hit or exceed the limit
    if (state.iteration >= TOTAL_GRAPH_ITERATIONS) {
        console.log("🏁 Conversation Complete - Max iterations reached");
        return "__end__";
    }
    console.log("➡️ Continuing to Teacher");
    return "teacher";
}

// Create the graph workflow
const workflow = new StateGraph(StateAnnotation)
    .addNode("teacher", teacherNode)
    .addNode("facilitator", facilitatorNode)
    .addEdge("__start__", "teacher")
    .addEdge("teacher", "facilitator")
    .addConditionalEdges("facilitator", shouldContinue)

// Initialize memory
const checkpointer = new MemorySaver();

// Compile the workflow
export const graph = workflow.compile({ checkpointer });

// Usage function
export async function chatWithGraph(
    message: string, 
    chatId: string, 
    emitChunk: (chunk: StreamChunk) => Promise<void>
) {
    console.log("🚀 Starting Chat:", { message, chatId });
    
    try {
        const events = await graph.streamEvents({
            messages: [new HumanMessage(message)],
            chatId,
            iteration: 0
        }, config);
            
        const nodeOutput: Record<string, string> = {
            teacher: "",
            facilitator: ""
        };

        for await (const event of events) {
            const chunk = event.data.chunk;
            const node = event.metadata.langgraph_node;
            
            if (event.event === "on_chat_model_stream") {
                // Accumulate text for this node
                nodeOutput[node] = nodeOutput[node] + (chunk.content || "");
                // Stream the chunk
                await emitChunk({
                    type: 'stream',
                    role: node.toUpperCase(),
                    content: chunk.content,
                    chatId,
                    isComplete: false
                });
            } else if (event.event === "on_chat_model_end") {
                const fullMessage = {
                    id: Date.now().toString(),
                    content: nodeOutput[node],
                    role: node.toUpperCase(),
                    chatId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                await saveMessage(fullMessage);
                console.log(`💾 Saved ${node} message`);
                // Reset node output
                nodeOutput[node] = "";
            }
        }
    } catch (error) {
        console.error("❌ Chat Error:", error);
        await emitChunk({
            type: 'error',
            error: error instanceof Error ? error.message : 'AI processing failed',
            chatId
        });
        throw error;
    }
}
