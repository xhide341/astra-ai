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

        const chats = await db.chat.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        return { chats };
    } catch (error) {
        console.error("Error fetching chat history", error);
        return { error: "Failed to fetch chat history" };
    }
};
