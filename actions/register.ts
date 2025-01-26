'use server';

import * as z from "zod";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { isDisposable } from "@/blocklist";


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
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    const isDisposableEmail = await isDisposable(email);
    if (isDisposableEmail) {
      return {
        error: { email: ["Disposable email addresses are not allowed"] },
      };
    }


    if (existingUser) {
      return {
        error: { email: ["Email already exists"] },
      };
    }

    await db.user.create({
      data: { name, email, password: hashedPassword },
    });
    
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken);

    return {
      success: "Confirmation email sent!",
    }
}