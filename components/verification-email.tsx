import { Html, Head, Body, Container, Text, Link, Preview, Section, Heading } from '@react-email/components';

interface EmailTemplateProps {
  confirmLink: string;
}

export const SendVerificationEmail = ({ confirmLink }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address to get started</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome! 👋</Heading>
        <Section style={section}>
          <Text style={text}>
            Thanks for signing up! Please verify your email address to get started.
          </Text>
          <Link style={button} href={confirmLink}>
            Verify Email Address
          </Link>
          <Text style={footer}>
            If you didn&apos;t request this email, you can safely ignore it.
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
