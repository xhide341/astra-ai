/*
***
1. Create a new chat session
2. Associate it with the current user
3. Return the chat ID and initial state
***
*/

'use server';

import { auth } from "@/auth";
import db from "@/lib/db";
import { CreateChatResponse } from "@/types/chat";

export const createChat = async (): Promise<CreateChatResponse> => {
    try {
        const session = await auth();
        
        const userId = session?.user?.id;
        if (!userId) {
            return { error: "Unauthorized" };
        }

        // Create chat with default title first
        const chat = await db.chat.create({
            data: {
                userId,
                title: "New Chat", // Default title
            },
        });

        return { chat };
    } catch (error) {
        console.error("Error creating chat", error);
        return { error: "Failed to create chat" };
    }
}; 