import { Skeleton } from '@/components/ui/skeleton';

export default function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-sm space-y-6 px-4">
        <div className="space-y-2 text-center">
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-10 w-full" />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Skeleton className="h-[1px] w-full" />
            </div>
            <div className="relative flex justify-center">
              <Skeleton className="h-4 w-8" />
            </div>
          </div>

          <Skeleton className="h-10 w-full" />
        </div>

        <div className="text-center">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
}
