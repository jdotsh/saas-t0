'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { logger } from '@/lib/logger';

export default function AuthError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error('Auth error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-sm space-y-6 px-4">
        <div className="space-y-2 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-warning" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Authentication Error
          </h1>
          <p className="text-sm text-muted-foreground">
            We encountered an issue with authentication. Please try again.
          </p>
        </div>

        {error.message && (
          <div className="rounded-lg border border-warning/20 bg-warning/10 p-3">
            <p className="text-xs text-warning-foreground">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button onClick={reset} className="w-full">
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = '/signin')}
            variant="outline"
            className="w-full"
          >
            Back to sign in
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          If you continue to experience issues, please contact support
          {error.digest && (
            <span className="block mt-1">Error ID: {error.digest}</span>
          )}
        </p>
      </div>
    </div>
  );
}
