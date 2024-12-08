import Credentials from "next-auth/providers/credentials";
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
        })
    ]
} satisfies NextAuthConfig