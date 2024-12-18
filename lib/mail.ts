import { Resend } from 'resend';
import { getUserByEmail } from '@/data/user';
import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string, 
    token: string
) => {
    const user = await getUserByEmail(email);
    if (!user) return;

    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "YourApp <onboarding@resend.dev>",
        to: email,
        subject: "Confirm your email",
        react: EmailTemplate({ confirmLink })
    });
};
