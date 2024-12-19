import db from "@/lib/db";
import crypto from "crypto";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export const generateVerificationToken = async (identifier: string): Promise<string> => {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour
  
    try {
        const existingToken = await getVerificationTokenByEmail(identifier);

        if (existingToken) {
            await db.verificationToken.deleteMany({
                where: { identifier }
            });
        }
  
      // Create new token
      const verificationToken = await db.verificationToken.create({
        data: {
          identifier,
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
                expiresAt: expires }
        });

        return passwordResetToken;
    } catch (error) {
        console.error("Error generating password reset token:", error);
        throw error;
    }
}


