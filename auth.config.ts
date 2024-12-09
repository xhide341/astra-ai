import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const validatedFields = loginSchema.safeParse(credentials);
                    
                    if (!validatedFields.success) {
                        return null;
                    }
                    
                    const { email, password } = validatedFields.data;
                    
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordsMatch = await bcryptjs.compare(
                        password,
                        user.password
                    );

                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Auth error:", error);
                    return null;
                }
            }
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
} satisfies NextAuthConfig