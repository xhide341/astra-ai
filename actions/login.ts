'use server';

import * as z from "zod";
import { loginSchema } from "@/schemas";

export type LoginResponse = {
  error?: { 
    email?: string[];
    password?: string[];
    remember?: string[];
  } | undefined;
  success?: string;
}

export const login = async (
  values: z.infer<typeof loginSchema>
): Promise<LoginResponse> => {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    return {
      success: "Email sent",
    }
}