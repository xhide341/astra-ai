/*
***
1. Validate the message
2. Store user message in database
3. Generate AI response
4. Store AI response in database
5. Return both messages
***
*/

'use server';

import { auth } from "@/auth";
import db from "@/lib/db";
import { SendMessageResponse } from "@/types/chat";

export const sendMessage = async (
    chatId: string,
    content: string
): Promise<SendMessageResponse> => {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        if (!userId) {
            return { error: "Unauthorized" };
        }

        // Create user message
        const userMessage = await db.message.create({
            data: {
                content,
                role: "USER",
                chatId
            }
        });

        // Update chat title if first message
        const messageCount = await db.message.count({
            where: { chatId }
        });

        if (messageCount === 1) {
            const updatedTitle = content.slice(0, 50) + (content.length > 50 ? "..." : "");
            await db.chat.update({
                where: { id: chatId },
                data: { title: updatedTitle }
            });
        }

        return { message: userMessage };
    } catch (error) {
        console.error("Error sending message:", error);
        return { error: "Failed to send message" };
    }
};