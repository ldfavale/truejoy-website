import { Skeleton } from "@/components/ui/skeleton"

function CatalogProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-true-beige-border/50 shadow-sm flex flex-col">
      <Skeleton className="aspect-square w-full rounded-none bg-true-beige/60" />
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 bg-true-beige/60" />
          <Skeleton className="h-6 w-3/4 bg-true-beige/60" />
          <Skeleton className="h-3 w-full bg-true-beige/60" />
          <Skeleton className="h-3 w-5/6 bg-true-beige/60" />
        </div>
        <div className="mt-auto space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-20 bg-true-beige/60" />
            <Skeleton className="h-5 w-16 rounded-full bg-true-beige/60" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1 rounded-xl bg-true-beige/60" />
            <Skeleton className="h-10 flex-1 rounded-xl bg-true-beige/60" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface CatalogProductSkeletonProps {
  count?: number
}

export function CatalogProductSkeleton({ count = 12 }: CatalogProductSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CatalogProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
