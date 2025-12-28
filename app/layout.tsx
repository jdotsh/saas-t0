import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { getURL } from '@/utils/helpers';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { ErrorBoundary } from '@/components/error-boundary';
import { Inter } from 'next/font/google';
import type { Viewport } from 'next';
import { TRPCReactProvider } from '@/trpc/react';
import { Analytics } from '@vercel/analytics/react';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

import '@/styles/globals.css';

/**
 * Font System - Optimized for readability
 *
 * Primary: Inter (body text)
 * - Excellent readability at all sizes
 * - Designed specifically for screens
 * - Variable font for optimal rendering
 *
 * Fallback: Geist Sans (Vercel's font)
 * - Modern, clean alternative
 * - Great for UI elements
 */
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true
});

const fontHeading = Inter({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI'
  ],
  authors: [
    {
      name: 'antoineross',
      url: 'https://antoineross.com'
    }
  ],
  creator: 'antoineross',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@antoineross'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `${siteConfig.url}/site.webmanifest`
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
