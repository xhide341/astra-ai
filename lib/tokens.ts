import db from "@/lib/db";
import crypto from "crypto";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";


// TODO: Later change to 15 minutes
export const generateVerificationToken = async (email: string): Promise<string> => {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour
  
    try {
        const existingToken = await getVerificationTokenByEmail(email);

        if (existingToken) {
            await db.verificationToken.delete({
                where: { id: existingToken.id }
            });
        }
  
      // Create new token
      const verificationToken = await db.verificationToken.create({
        data: {
          email,
          token,
          expiresAt: expires
        }
      });
  
      return verificationToken.token;
    } catch (error) {
      console.error("Error generating verification token:", error);
      throw error;
    }
};

export const generatePasswordResetToken = async (email: string) => {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour

    try {
        const existingToken = await getPasswordResetTokenByEmail(email);

        if (existingToken) {
            await db.passwordResetToken.delete({
                where: { id: existingToken.id }
            });
        }

        const passwordResetToken = await db.passwordResetToken.create({
            data: { 
                email, 
                token, 
                expiresAt: expires 
            }
        });

        return passwordResetToken;
    } catch (error) {
        console.error("Error generating password reset token:", error);
        throw error;
    }
}

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour

    try {
        const existingToken = await getTwoFactorTokenByEmail(email);

        if (existingToken) {
            await db.twoFactorToken.delete({
                where: { id : existingToken.id }
            });
        }

        const twoFactorToken = await db.twoFactorToken.create({
            data: {
                email,
                token,
                expiresAt: expires
            }
        });

        return twoFactorToken;
    } catch (error) {
        console.error("Error generating two factor token:", error);
        throw error;
    }
}


