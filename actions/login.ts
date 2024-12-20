'use server';

import * as z from "zod";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken,
         generateTwoFactorToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail,
         sendTwoFactorEmail } from "@/lib/mail";
import * as bcryptjs from "bcryptjs";

export type LoginResponse = {
  error?: { 
    email?: string[];
    password?: string[];
    remember?: string[];
    _form?: string[];
  } | undefined;
  success?: string;
  twoFactor?: boolean;
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
        await sendVerificationEmail(existingUser.email, verificationToken);
        return {
            success: "Confirmation email sent!",
        };
    }
        
    const passwordsMatch = await bcryptjs.compare(password, existingUser.password);
    if (!passwordsMatch) {
        return { error: { password: ["Invalid credentials"] } };
    }  

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        console.log("Starting 2FA flow for user:", existingUser.email);
    
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

        return { twoFactor: true };
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
                            _form: ["Invalid credentials"]
                        } 
                    };
                default:
                    return { 
                        error: { 
                            _form: ["Something went wrong"]
                        } 
                    };
            }
        }
        throw error;
    }
}