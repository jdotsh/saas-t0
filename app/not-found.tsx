import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
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
            {/* Massive 404 heading */}
            <h1 className="font-heading text-8xl font-bold tracking-tight sm:text-9xl">
              404
            </h1>

            {/* Error message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Page not found
              </h2>
              <p className="text-muted-foreground max-w-md">
                Sorry, we couldn't find the page you're looking for. Perhaps
                you've mistyped the URL? Be sure to check your spelling.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="default">
                <Link href="/">
                  <span className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="javascript:history.back()">
                  <span className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
