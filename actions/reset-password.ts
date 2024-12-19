'use server';

import * as z from "zod";
import { resetPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export type ResetPasswordResponse = {
  error?: string;
  success?: string;
}

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
): Promise<ResetPasswordResponse> => {
    const validatedFields = resetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Please enter a valid email address",
        };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "User not found" };
    }

    // TODO: Generate a reset token and send it to the user's email

    return { success: "Reset email sent!" };
}