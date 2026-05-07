'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { collegeApi } from '@/lib/api';
import CollegeCard from '@/components/CollegeCard';
import SearchFilter, { FilterState } from '@/components/SearchFilter';
import CompareBar from '@/components/CompareBar';
import { PageLoadingGrid } from '@/components/Skeleton';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';

export default function CollegesPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    type: '',
    course: '',
    minFees: '',
    maxFees: '',
    sortBy: 'rating',
    sortOrder: 'desc',
  });

  const queryParams = {
    search: filters.search || undefined,
    location: filters.location || undefined,
    type: filters.type || undefined,
    course: filters.course || undefined,
    minFees: filters.minFees ? Number(filters.minFees) : undefined,
    maxFees: filters.maxFees ? Number(filters.maxFees) : undefined,
    sortBy: filters.sortBy as any,
    sortOrder: filters.sortOrder as any,
    page,
    limit: 12,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['colleges', queryParams],
    queryFn: () => collegeApi.getColleges(queryParams),
  });

  const { data: filterOptions } = useQuery({
    queryKey: ['college-filters'],
    queryFn: collegeApi.getFilters,
    staleTime: Infinity,
  });

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const colleges = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-ink text-cream py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap size={20} className="text-amber" />
            <span className="text-cream/50 text-sm uppercase tracking-wider font-mono">College Directory</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold">
            Find your college
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and filters */}
        <div className="mb-8">
          <SearchFilter
            filters={filters}
            onChange={handleFilterChange}
            filterOptions={filterOptions}
            total={pagination?.total ?? 0}
          />
        </div>

        {/* Results */}
        {isLoading ? (
          <PageLoadingGrid />
        ) : isError ? (
          <div className="text-center py-20 text-ink-muted">
            <p className="text-lg">Failed to load colleges.</p>
            <p className="text-sm mt-1">Make sure the backend is running on port 4000.</p>
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-ink mb-2">No colleges found</h3>
            <p className="text-ink-muted">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrev}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl border border-ink/15 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream-deep transition-all"
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 2)
                    .reduce<(number | '...')[]>((acc, p, i, arr) => {
                      if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === '...' ? (
                        <span key={`ellipsis-${i}`} className="px-2 text-ink-faint">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                            p === page
                              ? 'bg-ink text-cream'
                              : 'hover:bg-cream-deep text-ink-muted'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                </div>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNext}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl border border-ink/15 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream-deep transition-all"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating compare bar */}
      <CompareBar />
    </div>
  );
}
