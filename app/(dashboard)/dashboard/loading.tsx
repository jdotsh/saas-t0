import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 gap-4 p-4">
      <div className="space-y-4">
        {/* Header skeleton */}
        <Skeleton className="h-8 w-64" />

        {/* Stats cards skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>

        {/* Content area skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="h-96 md:col-span-4 lg:col-span-4 rounded-lg" />
          <Skeleton className="h-96 md:col-span-3 rounded-lg" />
        </div>

        {/* List skeleton */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
