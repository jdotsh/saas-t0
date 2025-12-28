'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';
import { RefreshCw, Home, MessageCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    logger.error('Global error occurred:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col bg-background">
          {/* Preserve brand context with minimal header */}
          <header className="border-b">
            <div className="container mx-auto px-4">
              <nav className="flex h-16 items-center">
                <span className="text-xl font-bold">Nexus SaaS</span>
              </nav>
            </div>
          </header>

          {/* Full-screen error content */}
          <div className="flex flex-1 items-center justify-center">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center space-y-8 text-center">
                {/* Massive error code */}
                <h1 className="font-heading text-8xl font-bold tracking-tight text-destructive sm:text-9xl">
                  500
                </h1>

                {/* Error details */}
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Something went wrong!
                  </h2>
                  <p className="text-muted-foreground max-w-lg text-lg">
                    An unexpected error occurred. We apologize for the
                    inconvenience. Our team has been notified and is working to
                    fix this issue.
                  </p>
                  {error.digest && (
                    <p className="mt-4 font-mono text-sm text-muted-foreground">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>

                {/* Action buttons with icons */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button onClick={reset} size="lg" variant="default">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button
                    onClick={() => (window.location.href = '/')}
                    size="lg"
                    variant="outline"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Go to Homepage
                  </Button>
                </div>

                {/* Contact support */}
                <div className="mt-8">
                  <Button asChild variant="ghost" size="sm">
                    <a href="mailto:support@example.com">
                      <span className="flex items-center">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Support
                      </span>
                    </a>
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    If this problem persists, please reach out to our support
                    team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
