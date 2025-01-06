
import db from '@/lib/db';
import { auth } from '@/auth';


export async function deleteChat(chatId: string) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        if (!userId) {
            return { error: "Unauthorized" };
        }

        await db.chat.delete({
            where: { id: chatId, userId }
        });

        return { success: "Conversation deleted successfully." };

    } catch(error) {
        return { error: "Failed to delete conversation." };
    }
}