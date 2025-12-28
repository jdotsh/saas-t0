'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Global error occurred:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="mx-auto max-w-md space-y-6 px-4">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold tracking-tighter">500</h1>
              <h2 className="text-2xl font-semibold">Something went wrong!</h2>
              <p className="text-muted-foreground">
                An unexpected error occurred. We apologize for the
                inconvenience.
              </p>
              {error.digest && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button onClick={reset} variant="default">
                Try again
              </Button>
              <Button
                onClick={() => (window.location.href = '/')}
                variant="outline"
              >
                Go to homepage
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                If this problem persists, please{' '}
                <a
                  href="mailto:support@example.com"
                  className="text-primary underline"
                >
                  contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
