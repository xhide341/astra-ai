import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { StateGraph } from "@langchain/langgraph";
import { MemorySaver, Annotation, messagesStateReducer } from "@langchain/langgraph";
import { teacherModel, facilitatorModel } from "./model";
import { teacherPersona, facilitatorPersona } from "./personas";
import { emitter } from "../events";
import { processGraphUpdate } from "@/actions/chat/process-graph-stream";

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

// Teacher node
async function teacherNode(state: typeof StateAnnotation.State) {
    console.log("Teacher Node - Current iteration:", state.iteration);
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1].content;
    
    const formattedPrompt = await teacherPersona.formatMessages({
        input: String(lastMessage)
    });
    
    // Use streaming for better UX
    const stream = await teacherModel.stream(formattedPrompt);
    let content = "";
    
    for await (const chunk of stream) {
        content += chunk.content;
        // Emit through SSE
        emitter.emit('stream-chunk', {
            role: "TEACHER",
            content: chunk.content,
            chatId: state.chatId,
            isComplete: false
        });
    }

    console.log("Teacher Node Tokens:", {
        input: lastMessage.length,
        output: content.length,
        total: lastMessage.length + content.length
    });

    console.log("Teacher Node - Response generated");
    return { 
        messages: [...state.messages, new AIMessage({ content })],
        iteration: state.iteration + 0.5
    };
}

// Facilitator node
async function facilitatorNode(state: typeof StateAnnotation.State) {
    console.log("Facilitator Node - Current iteration:", state.iteration);
    const messages = state.messages;
    const teacherMessage = messages[messages.length - 1].content;
    
    const formattedPrompt = await facilitatorPersona.formatMessages({
        input: `Provide a response to the teacher's explanation: "${teacherMessage}"`
    });
    const response = await facilitatorModel.invoke(formattedPrompt);
    
    console.log("Facilitator Node Tokens:", {
        input: teacherMessage.length,
        output: response.content.length,
        total: teacherMessage.length + response.content.length
    });

    console.log("Facilitator Node - Completing iteration:", state.iteration);
    return { 
        messages: [...state.messages, new AIMessage({ content: String(response.content) })],
        iteration: state.iteration + 0.5
    };
}

// Define when to continue or end conversation
function shouldContinue(state: typeof StateAnnotation.State): "__end__" | "teacher" {
    console.log("ShouldContinue - Checking iteration:", state.iteration);
    if (state.iteration >= 2.5) {
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
    .addConditionalEdges("facilitator", shouldContinue);

// Initialize memory
const checkpointer = new MemorySaver();

// Compile the workflow
export const graph = workflow.compile({ checkpointer });

// Usage function
export async function chatWithGraph(message: string, chatId: string) {
    try {
        const stream = await graph.stream({
            messages: [new HumanMessage(message)],
            chatId
        }, {
            streamMode: ["updates"],
            configurable: {
                thread_id: chatId
            }
        });

        // Process stream chunks
        for await (const chunk of stream) {
            console.log("Graph processing chunk:", chunk);
            const [type, data] = chunk;
            
            if (type === "updates") {
                await processGraphUpdate(type, data, chatId);
            }
        }
    } catch (error) {
        console.error("Graph chat error:", error);
        throw error;
    }
}
