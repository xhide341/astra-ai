'use server';

import * as z from "zod";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export type RegisterResponse = {
  error?: { 
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

    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        error: { email: ["Email already exists"] },
      };
    }

    await db.user.create({
      data: { email, password: hashedPassword },
    });

    // TODO: Send verification token to email

    return {
      success: "User created!",
    }
}