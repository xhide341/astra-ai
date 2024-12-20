import { Html, Head, Body, Container, Text, Preview, Section, Heading } from '@react-email/components';

interface TwoFactorEmailProps {
  code: string;
}

export const TwoFactorEmail = ({ code }: TwoFactorEmailProps) => (
  <Html>
    <Head />
    <Preview>Your two-factor authentication code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Two-Factor Authentication</Heading>
        <Section style={section}>
          <Text style={text}>
            Your verification code is:
          </Text>
          <Text style={code_style}>
            {code}
          </Text>
          <Text style={footer}>
            This code will expire in 1 hour. If you didn&apos;t request this code, please ignore this email.
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

const code_style = {
  color: '#2563eb',
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '8px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  marginTop: '32px',
};
