'use server';

import { chatWithGraph } from "@/lib/langchain/graph";
import { StreamChunk } from "@/types/chat";

const testTrigger = async (content: string, chatId: string) => {
    await chatWithGraph(content, chatId, async (chunk: StreamChunk) => {
        // Handle the stream chunks here if needed
        console.log("Stream chunk:", chunk);
    });
}

export default testTrigger;
