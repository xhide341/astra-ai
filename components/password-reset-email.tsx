import { Html, Head, Body, Container, Text, Link, Preview, Section, Heading } from '@react-email/components';

interface PasswordResetEmailProps {
  newPasswordLink: string;
}

export const PasswordResetEmail = ({ newPasswordLink }: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Reset Your Password</Heading>
        <Section style={section}>
          <Text style={text}>
            Click the button below to reset your password. If you didn&apos;t request this, you can safely ignore this email.
          </Text>
          <Link style={button} href={newPasswordLink}>
            Reset Password
          </Link>
          <Text style={footer}>
            This link will expire in 1 hour.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  padding: '60px 0',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '5px',
  margin: '0 auto',
  padding: '45px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  marginBottom: '25px',
  textAlign: 'center' as const,
};

const section = {
  padding: '24px',
  textAlign: 'center' as const,
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '5px',
  color: '#fff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '100%',
  margin: '24px 0',
  padding: '16px 24px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  transition: 'background-color 0.2s',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  marginTop: '32px',
}; 