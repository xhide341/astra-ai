import db from "@/lib/db";
import crypto from "crypto";

export const generateVerificationToken = async (identifier: string): Promise<string> => {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour

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
