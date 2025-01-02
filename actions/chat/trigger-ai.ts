'use server';

import { chatWithGraph } from "@/lib/langchain/graph";
import { StreamChunk } from "@/types/chat";

export const triggerAI = async (
    content: string,
    chatId: string
): Promise<{ error?: string }> => {
    try {
        console.log("triggerAI starting with:", { content, chatId });
        await chatWithGraph(content, chatId, async (chunk: StreamChunk) => {
            // Log chunks during development
            console.log("Processing chunk:", chunk);
        });
        console.log("chatWithGraph completed");
        return {};
    } catch (error) {
        console.error("Error in triggerAI:", error);
        throw error;
    }
}; 