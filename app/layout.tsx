import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { getURL } from '@/utils/helpers';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { ErrorBoundary } from '@/components/error-boundary';
import { Inter, Space_Grotesk } from 'next/font/google';
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
 * Font System - Optimized for global SaaS
 *
 * Body: Inter
 * - 147 languages, 2000+ glyphs (US, DE, CN, JP, UK, IT, NO)
 * - Screen-optimized for maximum readability
 * - Variable font for performance
 * - Used by GitHub, Mozilla, Vercel
 *
 * Headings: Space Grotesk
 * - Tech-forward, geometric sans serif
 * - Creates strong visual hierarchy
 * - Variable font for smooth weight transitions
 * - Perfect contrast with Inter's humanist style
 */
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true
});

const fontHeading = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
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
