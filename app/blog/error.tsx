'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileX } from 'lucide-react';

export default function BlogError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog error:', error);
  }, [error]);

  return (
    <div className="container flex min-h-[400px] flex-col items-center justify-center space-y-4 py-8">
      <FileX className="h-12 w-12 text-muted-foreground" />
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Blog Post Error</h2>
        <p className="text-muted-foreground max-w-md">
          We couldn't load this blog post. This might be a temporary issue.
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={reset}>Retry</Button>
        <Button
          onClick={() => (window.location.href = '/blog')}
          variant="outline"
        >
          Back to Blog
        </Button>
      </div>

      {error.digest && (
        <p className="text-xs text-muted-foreground">
          Error reference: {error.digest}
        </p>
      )}
    </div>
  );
}
