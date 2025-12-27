import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsLoading() {
  return (
    <div className="w-full mx-auto">
      <div className="space-y-4">
        {/* Header skeleton */}
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="mt-2 h-4 w-96" />
        </div>

        {/* Settings cards skeleton */}
        <div className="grid gap-6">
          {/* Notifications card */}
          <div className="rounded-lg border bg-card">
            <div className="p-6 space-y-4">
              <div>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-1.5 h-4 w-64" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-1 h-3 w-48" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-11 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Language card */}
          <div className="rounded-lg border bg-card">
            <div className="p-6 space-y-4">
              <div>
                <Skeleton className="h-6 w-24" />
                <Skeleton className="mt-1.5 h-4 w-56" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>

          {/* Appearance card */}
          <div className="rounded-lg border bg-card">
            <div className="p-6 space-y-4">
              <div>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-1.5 h-4 w-72" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
