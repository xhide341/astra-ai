import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default { 
    providers: [Credentials({
        async authorize(credentials) {
            try {
                const validatedFields = loginSchema.parse(credentials);
                
                const { email, password } = validatedFields;
                
                const user = await getUserByEmail(email);
                if (!user || !user.password) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) {
                    return null;
                }

                return user;
            } catch {
                return null;
            }
        }
    })] 
} satisfies NextAuthConfig