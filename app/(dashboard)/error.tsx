'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function DashboardError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 p-8">
      <div className="flex flex-col items-center space-y-2">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <h2 className="text-xl font-semibold">Dashboard Error</h2>
        <p className="text-center text-sm text-muted-foreground">
          Something went wrong while loading your dashboard.
        </p>
        {error.message && (
          <div className="mt-4 max-w-md rounded-lg border border-destructive/20 bg-destructive/10 p-3">
            <p className="text-xs text-destructive">{error.message}</p>
          </div>
        )}
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
        <Button
          onClick={() => (window.location.href = '/dashboard')}
          variant="outline"
        >
          Reload dashboard
        </Button>
      </div>
    </div>
  );
}
