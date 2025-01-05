"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateChatTitle(chatId: string, newTitle: string) {
    try {
        await db.chat.update({
            where: {
                id: chatId,
            },
            data: {
                title: newTitle,
            }
        });

        revalidatePath("/chat");
        return { success: true };

    } catch (error) {
        console.error("Error updating chat title:", error);
        return { success: false, error: "Failed to update chat title" };
    }
}
