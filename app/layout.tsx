import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
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
            toastOptions={{
              unstyled: true,
              classNames: {
                toast: 'group flex w-full gap-3 items-center bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 transition-all',
                title: 'text-zinc-900 dark:text-zinc-100 text-sm font-medium',
                description: 'text-zinc-600 dark:text-zinc-400 text-sm',
                actionButton: 'bg-primary-500 text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-600 transition-colors',
                cancelButton: 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 px-3 py-2 text-sm font-medium rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors',
                closeButton: 'relative group/close p-1.5 rounded-md text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400 transition-colors',
              }
            }}
            icons={{
              success: <CheckCircleIcon className="w-5 h-5 text-green-500 dark:text-green-400" />,
              error: <XCircleIcon className="w-5 h-5 text-red-500 dark:text-red-400" />,
              close: (
                <div className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                  <XMarkIcon className="w-3 h-3 group-hover/close:scale-110 transition-transform" />
                </div>
              )
            }}
            position="bottom-right"
            expand
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
