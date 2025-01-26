'use server';

import { auth } from "@/auth";
import db from "@/lib/db";
import { GetMessagesResponse } from "@/types/chat";

export const getMessages = async (chatId: string): Promise<GetMessagesResponse> => {
    try {
        const session = await auth();

        const userId = session?.user?.id;
        if (!userId) {
            return { error: "Unauthorized" };
        }

        const messages = await db.message.findMany({
            where: {
                chatId,
                chat: {
                    userId: session.user.id
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return { messages };
    } catch (error) {
        console.error("Error fetching messages", error);
        return { error: "Failed to fetch messages" };
    }
};