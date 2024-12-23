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
import { revalidatePath } from "next/cache";

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

        const userMessage = await db.message.create({
            data: {
                content,
                role: "USER",
                chatId
            }
        });

        // TODO: Integrate with AI service to get a response
        const aiResponse = "This is a mock AI response";

        // Store AI response in database
        const assistantMessage = await db.message.create({
            data: {
                content: aiResponse,
                role: "ASSISTANT",
                chatId
            }
        });

        revalidatePath("/chat");

        return { message: userMessage, assistantMessage };
    } catch (error) {
        console.error("Error sending message", error);
        return { error: "Failed to send message" };
    }
}