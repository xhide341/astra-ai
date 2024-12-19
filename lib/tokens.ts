import db from "@/lib/db";

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