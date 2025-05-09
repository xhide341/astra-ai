"use server";

import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  // Step 1: Find the verification token in the database
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  // Step 2: Check if token has expired
  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  // Step 3: Find the user associated with the token's email
  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // Step 4: Update the user's record to mark email as verified
  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email,
    }
  });

  // Step 5: Clean up by removing the used verification token
  await db.verificationToken.delete({
    where: { 
      id: existingToken.id
    }
  });

  // Step 6: Return success message
  return { success: "Email verified successfully!" };
};