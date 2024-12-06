'use server';

import * as z from "zod";
import { registerSchema } from "@/schemas";

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

    return {
      success: "Email sent",
    }
}