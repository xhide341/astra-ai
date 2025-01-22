'use server';

import { auth } from "@/auth";
import db from "@/lib/db";
import { CreateChatResponse } from "@/types/chat";
import { revalidatePath } from "next/cache";

const MAX_CHATS_PER_USER = 3;

export const createChat = async (title?: string): Promise<CreateChatResponse> => {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        
        if (!userId) {
            return { error: "Unauthorized" };
        }

        // Check user's chat count
        const chatCount = await db.chat.count({
            where: { userId }
        });

        if (chatCount >= MAX_CHATS_PER_USER) {
            return { error: "Sorry, you've reached the maximum number of chats." };
        }

        // Create chat with default title first
        const chat = await db.chat.create({
            data: {
                userId,
                title: title || "New Chat",
            },
            include: {
                messages: true
            }
        });

        if (!chat) {
            return { error: "Failed to create chat" };
        }

        revalidatePath("/chat");

        return { chat };
    } catch (error) {
        console.error("Error creating chat:", error);
        return { error: "Failed to create chat" };
    }
}; 