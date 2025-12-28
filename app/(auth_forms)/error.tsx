'use client';

import { useEffect } from 'react';
import { ErrorPageLayout } from '@/components/error-page-layout';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

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
    <ErrorPageLayout
      title="Authentication Error"
      description="We encountered an issue with authentication. This might be due to an expired session or invalid credentials."
      showReset={true}
      onReset={reset}
      showHome={false}
      errorId={error.digest}
    >
      {/* Custom authentication-specific actions */}
      <div className="mt-4">
        <Button asChild variant="outline" size="lg">
          <Link href="/signin">
            <span className="flex items-center">
              <LogIn className="mr-2 h-4 w-4" />
              Back to Sign In
            </span>
          </Link>
        </Button>
      </div>

      {/* Show error details in development */}
      {process.env.NODE_ENV === 'development' && error.message && (
        <div className="mt-6 rounded-lg border border-warning/20 bg-warning/10 p-4 text-left max-w-lg">
          <p className="text-sm font-mono text-warning-foreground">
            {error.message}
          </p>
        </div>
      )}
    </ErrorPageLayout>
  );
}
