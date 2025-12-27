import { Skeleton } from '@/components/ui/skeleton';

export default function PricingLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Pricing cards skeleton */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border bg-card p-6 space-y-4"
            >
              {/* Plan name */}
              <Skeleton className="h-7 w-32" />

              {/* Price */}
              <div className="space-y-2">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Description */}
              <Skeleton className="h-16 w-full" />

              {/* CTA Button */}
              <Skeleton className="h-10 w-full rounded-md" />

              {/* Features list */}
              <div className="space-y-3 pt-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ or additional info skeleton */}
        <div className="mt-16 space-y-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <div className="space-y-3 max-w-2xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
