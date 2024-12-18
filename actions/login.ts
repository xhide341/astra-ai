'use server';

import * as z from "zod";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/verification-token";
import { getUserByEmail } from "@/data/user";

export type LoginResponse = {
  error?: { 
    email?: string[];
    password?: string[];
    remember?: string[];
    _form?: string[];
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

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: { _form: ["User not found"] },
        };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        return {
            success: "Confirmation email sent!",
        };
    }

    try {
        await signIn("credentials", { 
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
        
        return { success: "Logged in successfully!" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { 
                        error: { 
                            _form: ["Invalid email or password"]
                        } 
                    };
                default:
                    return { 
                        error: { 
                            _form: ["Something went wrong with authentication"]
                        } 
                    };
            }
        }
        throw error;
    }
}