'use server';

import db from "@/lib/db";
import { emitter } from "@/lib/events";
import { MessageRole } from "@prisma/client";

interface GraphData {
    teacher?: {
        messages: { content: string }[];
    };
    facilitator?: {
        messages: { content: string }[];
    };
}

export async function processGraphUpdate(
    type: string,
    data: GraphData,
    chatId: string
) {
    try {
        let role, content;
        
        if (data.teacher) {
            role = "TEACHER";
            content = data.teacher.messages[data.teacher.messages.length - 1].content;
        } else if (data.facilitator) {
            role = "FACILITATOR";
            content = data.facilitator.messages[data.facilitator.messages.length - 1].content;
        }

        if (role && content) {
            // Store in database
            const message = await db.message.create({
                data: {
                    content,
                    role: role as MessageRole,
                    chatId
                }
            });
            console.log("Graph Action: Stored message in DB:", message.id);

            // Emit UI update
            emitter.emit('ui-update', {
                type: 'newMessage',
                id: message.id,
                content,
                role,
                chatId
            });
        }
    } catch (error) {
        console.error("Graph Action error:", error);
        throw error;
    }
} 