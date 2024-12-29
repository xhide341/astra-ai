'use server';

import { chatWithGraph } from "@/lib/langchain/graph";

export const triggerAI = async (
    content: string,
    chatId: string
): Promise<{ error?: string }> => {
    try {
        console.log("triggerAI starting with:", { content, chatId });
        await chatWithGraph(content, chatId);
        console.log("chatWithGraph completed");
        return {};
    } catch (error) {
        console.error("Error in triggerAI:", error);
        throw error; // Let's throw the error to see the full stack trace
    }
}; 