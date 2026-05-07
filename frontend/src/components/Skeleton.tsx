export function CollegeCardSkeleton() {
  return (
    <div className="card animate-pulse overflow-hidden">
      <div className="h-24 bg-cream-deep" />
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-cream-deep rounded-lg w-3/4" />
          <div className="h-4 bg-cream-deep rounded w-1/2" />
        </div>
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-ink/8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-4 bg-cream-deep rounded w-10" />
              <div className="h-3 bg-cream-deep rounded w-8" />
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 bg-cream-deep rounded-full w-14" />
          ))}
        </div>
      </div>
      <div className="px-5 pb-4">
        <div className="h-9 bg-cream-deep rounded-xl" />
      </div>
    </div>
  );
}

export function PageLoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <CollegeCardSkeleton key={i} />
      ))}
    </div>
  );
}
