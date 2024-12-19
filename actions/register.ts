'use server';

import * as z from "zod";
import bcryptjs from "bcryptjs";
import { registerSchema } from "@/schemas";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export type RegisterResponse = {
  error?: { 
    name?: string[];
    email?: string[];
    password?: string[];
  } | undefined;
  success?: string;
}

export const register = async (
  values: z.infer<typeof registerSchema>
): Promise<RegisterResponse> => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        error: { email: ["Email already exists"] },
      };
    }

    await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    // TODO: Send verification token to email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken);

    return {
      success: "Confirmation email sent!",
    }
}