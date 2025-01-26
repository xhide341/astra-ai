'use server';

import * as z from "zod";
import { newPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import db from "@/lib/db";


export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string | null
): Promise<{ error?: string; success?: string }> => {

    if (!token) {
        return { error: "Missing token" };
    }

    const validatedFields = newPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Please enter a valid password",
        };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return { error: "Invalid token" };
    }

    const hasExpired = existingToken.expiresAt < new Date();
    if (hasExpired) {
        return { error: "Token expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { error: "Email not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.user.update({
            where: { id: existingUser.id },
            data: { password: hashedPassword },
        });

        await db.passwordResetToken.deleteMany({
            where: { id: existingToken.id }
        });

        return { success: "Password updated!" };
    } catch (error) {
        return { error: error as string };
    }
}