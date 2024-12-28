'use server';

import db from "@/lib/db";
import { MessageRole } from "@prisma/client";

export async function saveMessage(content: string, role: MessageRole, chatId: string) {
    try {
        const message = await db.message.create({
            data: {
                content,
                role,
                chatId
            }
        });
        return message;
    } catch (error) {
        console.error("Error creating message:", error);
        throw error;
    }
}
