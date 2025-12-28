import { Skeleton } from '@/components/ui/skeleton';

export default function MarketingLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section skeleton */}
      <div className="text-center space-y-4 mb-16">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <div className="flex justify-center gap-4 mt-8">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>

      {/* Features grid skeleton */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>

      {/* CTA section skeleton */}
      <div className="bg-muted rounded-lg p-12 text-center space-y-4">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
        <Skeleton className="h-12 w-40 mx-auto mt-6" />
      </div>
    </div>
  );
}
