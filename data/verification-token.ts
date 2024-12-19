import db from "@/lib/db";
import crypto from "crypto";

export const createVerificationToken = async (identifier: string, token: string, expires: Date) => {
  try {
    await db.verificationToken.create({
      data: {
        identifier,
        token,
        expires
    },
    });
  } catch (error) {
    console.error("Error creating verification token:", error);
  }
};

export const getVerificationTokenByIdentifier = async (identifier: string, token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { 
        identifier_token: {
          identifier,
          token
        }
      }
    });

    return verificationToken;
  } catch (error) {
    console.error("Error getting verification token:", error);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token: token
      }
    });

    return verificationToken;
  } catch (error) {
    console.error("Error getting verification token:", error);
    return null;
  }
};

export const generateVerificationToken = async (identifier: string): Promise<string> => {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

  try {
    await db.verificationToken.deleteMany({
      where: {
        identifier
      }
    });
  } catch (error) {
    console.error("Error deleting existing tokens:", error);
  }

  const newToken = await db.verificationToken.create({
    data: {
      identifier,
      token,
      expires
    },
  });

  return newToken.token;
};
