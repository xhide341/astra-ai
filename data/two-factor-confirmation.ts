import db from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findFirst({
            where: {
                userId: userId,
            },
        });
        
        return twoFactorConfirmation;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get two factor confirmation by user id!");
    }
}
