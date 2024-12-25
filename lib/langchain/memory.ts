// import { BufferMemory } from "langchain/memory";
// import { Message } from "@prisma/client";
// import { AIMessage, HumanMessage } from "@langchain/core/messages";
// import db from "@/lib/db";

// // Convert our DB messages to Langchain message format
// const convertToLangchainMessages = (messages: Message[]) => {
//     return messages.map(msg => {
//         const content = msg.content;
//         return msg.role === "USER" 
//             ? new HumanMessage(content)
//             : new AIMessage(content);
//     });
// };

// // Get chat memory for a specific chat
// export const getChatMemory = async (chatId: string) => {
//     try {
//         // Get existing messages from your DB
//         const messages = await db.message.findMany({
//             where: { chatId },
//             orderBy: { createdAt: 'asc' }
//         });

//         // Create memory instance with existing messages
//         return new BufferMemory({
//             chatHistory: convertToLangchainMessages(messages),
//             returnMessages: true,
//             memoryKey: "chat_history",
//         });
//     } catch (error) {
//         console.error("Error creating chat memory:", error);
//         throw error;
//     }
// };
