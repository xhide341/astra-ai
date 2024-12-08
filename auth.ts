import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";


declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole;
        } & DefaultSession["user"];
    }
}

export const {
    handlers,
    auth,
    signIn,
    signOut
} = NextAuth(
    {
        callbacks: {
            async session({ session, token }) {
                if (token.sub && session.user) {
                    session.user.id = token.sub;
                }

                if (token.role && session.user) {
                    session.user.role = token.role as UserRole;
                }

                return session;
            },
            async jwt ({ token }) {
                if (!token.sub) return token;

                const existingUser = await getUserById(token.sub);
                if (!existingUser) return token;

                token.role = existingUser.role;

                return token;
            }
        },
        adapter: PrismaAdapter(db),
        session: {
            strategy: "jwt",
        },  
        ...authConfig
    }
)