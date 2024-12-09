import db from "@/lib/db";
import crypto from "crypto";

export const createVerificationToken = async (identifier: string, token: string, expires: Date) => {
  await db.verificationToken.create({
    data: {
      identifier,
      token,
      expires
    },
  });
};

export const getVerificationTokenByIdentifier = async (identifier: string, token: string) => {
  return await db.verificationToken.findUnique({
    where: { 
      identifier_token: {
        identifier,
        token
      }
    },
  });
};

export const generateVerificationToken = async (identifier: string): Promise<string> => {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

  const existingToken = await getVerificationTokenByIdentifier(identifier, token);
  if (existingToken) {
    return generateVerificationToken(identifier);
  }

  await createVerificationToken(identifier, token, expires);
  return token;
};
