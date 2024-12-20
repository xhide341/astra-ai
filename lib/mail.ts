import { Resend } from 'resend';
import { getUserByEmail } from '@/data/user';
import { SendVerificationEmail } from '@/components/verification-email';
import { PasswordResetEmail } from '@/components/password-reset-email';
import { TwoFactorEmail } from '@/components/two-factor-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string, 
    token: string
) => {
    const user = await getUserByEmail(email);
    if (!user) return;

    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "AURA Bot <onboarding@resend.dev>",
        to: email,
        subject: "Confirm your email",
        react: SendVerificationEmail({ confirmLink })
    });
};

export const sendPasswordResetEmail = async (
    email: string, 
    token: string
) => {
    const user = await getUserByEmail(email);
    if (!user) return;

    const newPasswordLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "AURA Bot <onboarding@resend.dev>",
        to: email,
        subject: "Reset your password",
        react: PasswordResetEmail({ newPasswordLink })
    });
}

export const sendTwoFactorEmail = async (
    email: string,
    token: string
) => {
    const user = await getUserByEmail(email);
    if (!user) return;

    await resend.emails.send({
        from: "AURA Bot <onboarding@resend.dev>",
        to: email,
        subject: "Two-Factor Authentication",
        react: TwoFactorEmail({ code: token })
    });
}
