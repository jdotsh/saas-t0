'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, RefreshCw, MessageCircle } from 'lucide-react';

interface ErrorPageLayoutProps {
  errorCode?: string | number;
  title: string;
  description: string;
  showReset?: boolean;
  onReset?: () => void;
  showHome?: boolean;
  showBack?: boolean;
  showContact?: boolean;
  errorId?: string;
  children?: ReactNode;
}

export function ErrorPageLayout({
  errorCode,
  title,
  description,
  showReset = true,
  onReset,
  showHome = true,
  showBack = false,
  showContact = true,
  errorId,
  children
}: ErrorPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Preserve site header/navigation context */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Nexus SaaS
            </Link>
          </nav>
        </div>
      </header>

      {/* Full-screen error content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-8 text-center">
            {/* Massive error code if provided */}
            {errorCode && (
              <h1 className="font-heading text-8xl font-bold tracking-tight text-destructive sm:text-9xl">
                {errorCode}
              </h1>
            )}

            {/* Error details */}
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
              <p className="text-muted-foreground max-w-lg text-lg">
                {description}
              </p>
              {errorId && (
                <p className="mt-4 font-mono text-sm text-muted-foreground">
                  Error ID: {errorId}
                </p>
              )}
            </div>

            {/* Custom content */}
            {children}

            {/* Action buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {showReset && onReset && (
                <Button onClick={onReset} size="lg" variant="default">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}
              {showHome && (
                <Button
                  asChild
                  size="lg"
                  variant={showReset ? 'outline' : 'default'}
                >
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go to Homepage
                  </Link>
                </Button>
              )}
              {showBack && (
                <Button
                  onClick={() => window.history.back()}
                  size="lg"
                  variant="outline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              )}
            </div>

            {/* Contact support */}
            {showContact && (
              <div className="mt-8">
                <Button asChild variant="ghost" size="sm">
                  <a href="mailto:support@example.com">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Support
                  </a>
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  If this problem persists, please reach out to our support team
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
