'use server';

import db from "@/lib/db";
import { MessageRole } from "@prisma/client";

interface SaveMessageParams {
    content: string;
    role: MessageRole;
    chatId: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function saveMessage({
    content,
    role,
    chatId,
    createdAt,
    updatedAt
}: SaveMessageParams) {
    try {
        const message = await db.message.create({
            data: {
                content,
                role,
                chatId,
                createdAt,
                updatedAt
            }
        });
        return message;
    } catch (error) {
        console.error("Error creating message:", error);
        throw error;
    }
}
