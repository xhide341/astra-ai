'use server';

import { auth } from "@/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteChat(chatId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    await db.chat.delete({
      where: {
        id: chatId,
        userId: session.user.id
      }
    });

    revalidatePath('/chat');
    return { success: "Conversation deleted successfully." };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : "Failed to delete conversation." 
    };
  }
}