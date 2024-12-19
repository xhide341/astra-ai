'use server';

import * as z from "zod";
import { resetPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
): Promise<{ error?: string; success?: string }> => {
    const validatedFields = resetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Please enter a valid email address",
        };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "Email not found" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(email, passwordResetToken.token);

    return { success: "Reset email sent!" };
}