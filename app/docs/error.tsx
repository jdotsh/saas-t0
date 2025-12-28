'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookX } from 'lucide-react';
import { logger } from '@/lib/logger';

export default function DocsError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error('Documentation error:', error);
  }, [error]);

  return (
    <div className="container flex min-h-[400px] flex-col items-center justify-center space-y-4 py-8">
      <BookX className="h-12 w-12 text-muted-foreground" />
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Documentation Error</h2>
        <p className="text-muted-foreground max-w-md">
          We encountered an issue loading the documentation. Please try
          refreshing the page.
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Button
          onClick={() => (window.location.href = '/docs')}
          variant="outline"
        >
          Documentation Home
        </Button>
      </div>

      {error.digest && (
        <p className="text-xs text-muted-foreground">
          Reference: {error.digest}
        </p>
      )}
    </div>
  );
}
