'use client';

import { useEffect } from 'react';
import { ErrorPageLayout } from '@/components/error-page-layout';
import { logger } from '@/lib/logger';

export default function DashboardError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error('Dashboard error:', error);
  }, [error]);

  return (
    <ErrorPageLayout
      title="Dashboard Error"
      description="Something went wrong while loading your dashboard. Your data is safe, and we're working to resolve this issue."
      showReset={true}
      onReset={reset}
      showHome={true}
      showBack={true}
      errorId={error.digest}
    />
  );
}
