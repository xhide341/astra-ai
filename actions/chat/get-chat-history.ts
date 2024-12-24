/*
***
1. Fetch all chats for current user
2. Return formatted chat history
***
*/

'use server';

import { auth } from "@/auth";
import db from "@/lib/db";
import { GetChatsResponse } from "@/types/chat";

export const getChatHistory = async (): Promise<GetChatsResponse> => {
    try {
        const session = await auth();

        const userId = session?.user?.id;
        if (!userId) {
            return { error: "Unauthorized" };
        }

        // Get all chats with message count
        const chats = await db.chat.findMany({
            where: { userId },
            include: {
                _count: {
                    select: { messages: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        // Delete empty chats
        for (const chat of chats) {
            if (chat._count.messages === 0) {
                await db.chat.delete({
                    where: { id: chat.id }
                });
            }
        }

        // Get remaining chats (now all have messages)
        const remainingChats = chats.filter(chat => chat._count.messages > 0);
        
        // Format chats for response
        const formattedChats = remainingChats.map(chat => ({
            ...chat,
            _count: undefined
        }));

        return { chats: formattedChats };
    } catch (error) {
        console.error("Error fetching chat history", error);
        return { error: "Failed to fetch chat history" };
    }
};
