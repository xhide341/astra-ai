import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { StateGraph } from "@langchain/langgraph";
import { MemorySaver, Annotation, messagesStateReducer } from "@langchain/langgraph";
import { teacherModel, facilitatorModel } from "./model";
import { teacherPersona, facilitatorPersona } from "./personas";
import { trimMessages } from "@langchain/core/messages";
import { concat } from "@langchain/core/utils/stream";
import { emitter } from "@/lib/sse";
import { StreamChunk } from "@/types/chat";
import { saveMessage } from "@/actions/chat/save-message";
import { MessageRole } from "@prisma/client";

const TOTAL_GRAPH_ITERATIONS = 2;

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
        reducer: (prev) => prev + 0.5
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

// Configure message trimmer
const messageTrimmer = trimMessages({
    maxTokens: 4000, // Adjust based on your model's context window
    strategy: "last",
    tokenCounter: (text) => Math.ceil(text.length / 4), // Simple approximation
    includeSystem: true,
    allowPartial: false,
    startOn: "human"
});

// Teacher node with trimming
async function teacherNode(state: typeof StateAnnotation.State) {
    console.log("Teacher Node - Current iteration:", state.iteration);
    
    // Trim messages before processing
    const trimmedMessages = await messageTrimmer.invoke(state.messages);
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
    console.log("Facilitator Node - Current iteration:", state.iteration);
    
    const trimmedMessages = await messageTrimmer.invoke(state.messages);
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

    console.log("Facilitator Node - Completing iteration:", state.iteration);
    return { 
        messages: [...state.messages, new AIMessage({ 
            content: response.content,
        })],
        iteration: state.iteration + 0.5
    };
}

// Define when to continue or end conversation
function shouldContinue(state: typeof StateAnnotation.State): "__end__" | "teacher" {
    console.log("ShouldContinue - Checking iteration:", state.iteration);
    
    if (state.iteration >= TOTAL_GRAPH_ITERATIONS) {
        console.log("ShouldContinue - Ending conversation");
        return "__end__";
    }
    console.log("ShouldContinue - Continuing to teacher");
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
export async function chatWithGraph(message: string, chatId: string) {
    try {
        const events = await graph.streamEvents({
            messages: [new HumanMessage(message)],
            chatId
        }, config);
            
        const nodeOutput: Record<string, string> = {
            teacher: "",
            facilitator: ""
        };

        for await (const event of events) {
            const chunk = event.data.chunk;
            const node = event.metadata.langgraph_node;
            
            if (event.event === "on_chain_start") {
                console.log("Starting chain");
                nodeOutput[node] = "";
            } else if (event.event === "on_chain_end") {
                console.log("Ending chain");
                nodeOutput[node] = "";
            } else if (event.event === "on_chat_model_start") {
                console.log("Starting chat model");
                nodeOutput[node] = "";
            } else if (event.event === "on_chat_model_stream") {
                nodeOutput[node] = concat(nodeOutput[node], chunk.content);
                // console.log(event.event);
                // Emit streaming chunks
                emitter.emit(`chat:${chatId}`, {
                    role: node,
                    content: chunk.content,
                    chatId,
                    isComplete: false
                } as StreamChunk);
            } else if (event.event === "on_chat_model_end") {
                // Save completed message to database
                const savedMessage = await saveMessage({
                    content: nodeOutput[node],
                    role: node.toUpperCase() as MessageRole,
                    chatId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                if (savedMessage) {
                    console.log("Completed message saved to database");
                    console.log(savedMessage);
                }

                // Emit completion
                emitter.emit(`chat:${chatId}`, {
                    role: node,
                    content: nodeOutput[node],
                    chatId,
                    isComplete: true
                } as StreamChunk);
                
                nodeOutput[node] = "";
            }
        }
    } catch (error) {
        console.error("Graph chat error:", error);
        emitter.emit(`chat:${chatId}`, {
            role: 'system',
            content: 'An error occurred during the conversation.',
            chatId,
            isComplete: true
        } as StreamChunk);
        throw error;
    }
}
