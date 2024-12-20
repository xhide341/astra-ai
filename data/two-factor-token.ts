import db from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: {
                token: token,
            },
        });

        return twoFactorToken;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get two factor token by token!");
    }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: {
                email: email,
            },
        });
        
        return twoFactorToken;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get two factor token by email!");
    }
};
