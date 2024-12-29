'use server';

import { chatWithGraph } from "@/lib/langchain/graph";

export const triggerAI = async (
    content: string,
    chatId: string
): Promise<{ error?: string }> => {
    try {
        await chatWithGraph(content, chatId);
        return {};
    } catch (error) {
        console.error("Error triggering AI:", error);
        return { error: "Failed to trigger AI response" };
    }
}; 