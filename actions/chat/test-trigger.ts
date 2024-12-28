'use server';

import { chatWithGraph } from "@/lib/langchain/graph";

const testTrigger = async (content: string, chatId: string) => {
    await chatWithGraph(content, chatId);
}

export default testTrigger;
