import db from "@/lib/db";
import crypto from "crypto";

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: { token }
        });

        return passwordResetToken;
    } catch (error) {
        console.error("Error getting password reset token:", error);
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email }
        });

        return passwordResetToken;
    } catch (error) {
        console.error("Error getting password reset token:", error);
        return null;
    }
}

export const generatePasswordResetToken = async (email: string) => {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour

    await db.passwordResetToken.deleteMany({
        where: { email }
    });

    const newPasswordResetToken = await db.passwordResetToken.create({
        data: { email, token, expiresAt: expires }
    });

    return newPasswordResetToken;
}
