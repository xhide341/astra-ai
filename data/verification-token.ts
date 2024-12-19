import db from "@/lib/db";
import crypto from "crypto";


export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    });

    return verificationToken;
  } catch (error) {
    console.error("Error getting verification token:", error);
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { identifier: email }
    });

    return verificationToken;
  } catch (error) {
    console.error("Error getting verification token:", error);
    return null;
  }
};

export const generateVerificationToken = async (identifier: string): Promise<string> => {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour

  try {
    // Delete any existing tokens for this email
    await db.verificationToken.deleteMany({
      where: { identifier }
    });

    // Create new token
    const verificationToken = await db.verificationToken.create({
      data: {
        identifier,
        token,
        expires
      }
    });

    return verificationToken.token;
  } catch (error) {
    console.error("Error generating verification token:", error);
    throw error;
  }
};