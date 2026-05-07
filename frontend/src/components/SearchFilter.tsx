'use client';

import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FilterOptions } from '@/types';

export interface FilterState {
  search: string;
  location: string;
  type: string;
  course: string;
  minFees: string;
  maxFees: string;
  sortBy: string;
  sortOrder: string;
}

interface SearchFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  filterOptions: FilterOptions | undefined;
  total: number;
}

export default function SearchFilter({ filters, onChange, filterOptions, total }: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      if (localSearch !== filters.search) {
        onChange({ ...filters, search: localSearch });
      }
    }, 350);
    return () => clearTimeout(t);
  }, [localSearch]);

  const update = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.location || filters.type || filters.course || filters.minFees || filters.maxFees;

  const clearAll = () => {
    setLocalSearch('');
    onChange({
      search: '',
      location: '',
      type: '',
      course: '',
      minFees: '',
      maxFees: '',
      sortBy: 'rating',
      sortOrder: 'desc',
    });
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          type="text"
          placeholder="Search colleges, cities, states..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="input pl-10 pr-4"
        />
        {localSearch && (
          <button
            onClick={() => { setLocalSearch(''); onChange({ ...filters, search: '' }); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter toggle + sort */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            showFilters || hasActiveFilters
              ? 'bg-ink text-cream border-ink'
              : 'bg-white border-ink/15 text-ink-muted hover:border-ink/30'
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-amber" />}
        </button>

        <div className="flex-1 relative">
          <select
            value={`${filters.sortBy}_${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('_');
              onChange({ ...filters, sortBy, sortOrder });
            }}
            className="select pr-8"
          >
            <option value="rating_desc">Top Rated</option>
            <option value="nirfRank_asc">NIRF Rank</option>
            <option value="totalFees_asc">Lowest Fees</option>
            <option value="totalFees_desc">Highest Fees</option>
            <option value="name_asc">A–Z Name</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
        </div>

        <span className="text-sm text-ink-muted whitespace-nowrap">{total} colleges</span>
      </div>

      {/* Expandable filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-ink/8 p-5 space-y-4 shadow-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5 uppercase tracking-wide">State</label>
              <div className="relative">
                <select
                  value={filters.location}
                  onChange={(e) => update('location', e.target.value)}
                  className="select pr-8"
                >
                  <option value="">All States</option>
                  {filterOptions?.states.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5 uppercase tracking-wide">Type</label>
              <div className="relative">
                <select
                  value={filters.type}
                  onChange={(e) => update('type', e.target.value)}
                  className="select pr-8"
                >
                  <option value="">All Types</option>
                  {filterOptions?.types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
              </div>
            </div>

            {/* Min Fees */}
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5 uppercase tracking-wide">Min Fees</label>
              <input
                type="number"
                placeholder="e.g. 100000"
                value={filters.minFees}
                onChange={(e) => update('minFees', e.target.value)}
                className="input"
              />
            </div>

            {/* Max Fees */}
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5 uppercase tracking-wide">Max Fees</label>
              <input
                type="number"
                placeholder="e.g. 2000000"
                value={filters.maxFees}
                onChange={(e) => update('maxFees', e.target.value)}
                className="input"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end pt-1">
              <button onClick={clearAll} className="text-sm text-amber hover:text-amber-DEFAULT font-medium flex items-center gap-1">
                <X size={13} /> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
