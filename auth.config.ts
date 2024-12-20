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
                    // Step 1: Validate the incoming credentials against our login schema
                    const validatedFields = loginSchema.safeParse(credentials);
                    
                    if (!validatedFields.success) {
                        return null; // Return null if validation fails
                    }
                    
                    // Step 2: Extract validated email and password
                    const { email, password } = validatedFields.data;
                    
                    // Step 3: Check if user exists in database
                    // Also verify user has password (important for social login accounts)
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) {
                        return null; // Return null if user not found or has no password
                    }

                    // Step 4: Compare provided password with hashed password in database
                    const passwordsMatch = await bcryptjs.compare(
                        password,
                        user.password
                    );

                    // Step 5: Return null for invalid password, or the user object for successful login
                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    // Step 6: Handle any unexpected errors during authentication
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