import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { StateGraph } from "@langchain/langgraph";
import { MemorySaver, Annotation, messagesStateReducer } from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "./model";

// Define prompt template with formatting instructions
const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a helpful AI assistant named Aura that provides clear and well-formatted answers.
    If you think you need to structure your responses using markdown, follow these styling rules:
    
    Text Formatting:
    - Use normal text size for all responses (no large text)
    - Keep paragraphs concise and readable
    - Use **bold** for emphasis sparingly
    - Use \`code\` for technical terms
    
    Headings:
    - Use ### for main headings (smaller than default)
    - Use #### for subheadings (smaller than default)
    
    Lists and Code:
    - Use bullet points (-) for unordered lists
    - Use numbers (1.) for ordered lists
    - Indent nested lists with 2 spaces
    - For code blocks, always specify language:
    
    \`\`\`language
    code here
    \`\`\`
    
    Response Structure:
    ### Main Topic
    Brief, concise introduction
    
    #### Key Points
    - Point 1
    - Point 2
      - Sub-point if needed
    
    #### Details
    Concise explanation with proper spacing
    
    Remember:
    - Use spacing for readability
    - Break long responses into smaller sections
    - Avoid excessive formatting`],
    ["human", "{input}"],
]);

// Define state structure
const StateAnnotation = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
        reducer: messagesStateReducer,
    }),
});

// Define model call function with prompt
async function callModel(state: typeof StateAnnotation.State) {
    const messages = state.messages;
    const formattedPrompt = await prompt.formatMessages({
        input: messages[messages.length - 1].content
    });
    const response = await model.invoke(formattedPrompt);
    // Explicitly create an AIMessage
    return { messages: [new AIMessage(response.content as string)] };
}

// Define when to continue or end conversation
function shouldContinue(state: typeof StateAnnotation.State) {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1];
    // Check if it's an AI message
    if (lastMessage instanceof AIMessage) {
        return "__end__";
    }
    return "agent";
}

// 2.Create the graph workflow
const workflow = new StateGraph(StateAnnotation)
    .addNode("agent", callModel)
    .addEdge("__start__", "agent")
    .addConditionalEdges("agent", shouldContinue);

// Initialize memory
const checkpointer = new MemorySaver();

// Compile the workflow into usable graph
export const graph = workflow.compile({ checkpointer });

// Usage graph via invoke
export async function chatWithGraph(message: string, chatId: string) {
    try {
        // Add input validation
        if (!message.trim() || message.length > 2000) { // Common chat limit
            throw new Error("Invalid message length");
        }

        const finalState = await graph.invoke(
            {
                messages: [new HumanMessage(message)]
            },
            {
                configurable: {
                    thread_id: chatId,  // Use chatId for persistent memory
                }
            }
        );

        // 2. Get last message from the conversation
        const lastMessage = finalState.messages[finalState.messages.length - 1];
        
        // 3. Check if it's an AI message
        if (lastMessage instanceof AIMessage) {
            // Convert complex content to string
            return String(lastMessage.content);
        }
        throw new Error("Unexpected message type");
    } catch (error) {
        console.error("Graph chat error:", error);
        throw error;
    }
}
