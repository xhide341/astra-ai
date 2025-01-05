import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';
import '@/app/globals.css';

// TODO: Add required assets to /public directory:
// 1. og-image.png (1200x630px) - Social media preview image
// 2. favicon.ico (32x32px) - Browser tab icon
// 3. favicon-16x16.png - Small favicon variant
// 4. apple-touch-icon.png (180x180px) - iOS home screen icon
// 5. site.webmanifest - PWA manifest file

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'AURA - AI Learning Platform',
    template: '%s | AURA'
  },
  description: 'Experience dynamic learning through dual AI minds that observe, reflect, and teach together.',
  keywords: ['AI learning', 'education', 'artificial intelligence', 'tutoring', 'personalized learning'],
  authors: [{ name: 'AURA Team' }],
  creator: 'AURA Team',
  publisher: 'AURA',
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            gutter={12}
            containerStyle={{
              bottom: 40,
              right: 40,
              animation: 'ease-out'
            }}
            toastOptions={{
              className: 'bg-white text-zinc-900 border border-zinc-200',
              style: {
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                maxWidth: '500px',
                animation: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: 'white'
                }
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: 'white'
                }
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
