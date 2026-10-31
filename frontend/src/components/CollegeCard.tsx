'use client';

import Link from 'next/link';
import { MapPin, Star, Users, TrendingUp, Plus, Check, BookOpen } from 'lucide-react';
import type { College } from '@/types';
import { formatFees, formatPackage, getTypeColor } from '@/lib/utils';
import { useCompare } from '@/context/CompareContext';

interface CollegeCardProps {
  college: College;
}

const COLLEGE_COLORS = [
  'from-teal-500 to-emerald-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-lime-500 to-green-600',
];

function getGradient(id: string) {
  const idx = id.charCodeAt(0) % COLLEGE_COLORS.length;
  return COLLEGE_COLORS[idx];
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { addToCompare, removeFromCompare, isSelected, canAdd } = useCompare();
  const selected = isSelected(college.id);
  const latestPlacement = college.placements?.[0];

  return (
    <div className="card group relative flex flex-col overflow-hidden">
      {/* Header gradient */}
      <div className={`h-24 bg-gradient-to-br ${getGradient(college.id)} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full border-2 border-white/40" />
          <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full border-2 border-white/20" />
        </div>
        {college.nirfRank && (
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded-full">
            NIRF #{college.nirfRank}
          </div>
        )}
        <div className="absolute bottom-3 left-4">
          <span className={`badge ${getTypeColor(college.type)} text-xs`}>{college.type}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <Link
            href={`/colleges/${college.id}`}
            className="font-display text-lg font-semibold text-ink leading-snug hover:text-amber transition-colors line-clamp-2"
          >
            {college.name}
          </Link>
          <div className="flex items-center gap-1 mt-1 text-ink-muted text-sm">
            <MapPin size={12} />
            <span className="truncate">{college.city}, {college.state}</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-ink/8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star size={12} className="text-amber fill-amber" />
              <span className="text-sm font-semibold text-ink">{college.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-ink-faint">Rating</span>
          </div>
          <div className="text-center border-x border-ink/8">
            <div className="text-sm font-semibold text-ink font-mono">{formatFees(college.totalFees)}</div>
            <span className="text-xs text-ink-faint">Total Fees</span>
          </div>
          <div className="text-center">
            {latestPlacement ? (
              <>
                <div className="text-sm font-semibold text-teal font-mono">{latestPlacement.placementRate}%</div>
                <span className="text-xs text-ink-faint">Placed</span>
              </>
            ) : (
              <>
                <div className="text-sm font-semibold text-ink-faint">—</div>
                <span className="text-xs text-ink-faint">Placed</span>
              </>
            )}
          </div>
        </div>

        {/* Courses */}
        {college.courses && college.courses.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {college.courses.slice(0, 3).map((c) => (
              <span key={c.id} className="badge bg-cream-deep text-ink-muted text-xs">
                {c.degree}
              </span>
            ))}
            {college.courses.length > 3 && (
              <span className="badge bg-cream-deep text-ink-faint text-xs">+{college.courses.length - 3}</span>
            )}
          </div>
        )}

        {latestPlacement && (
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <TrendingUp size={12} className="text-teal" />
            <span>Avg: <strong className="text-ink">{formatPackage(latestPlacement.avgPackage)}</strong></span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 flex items-center gap-2">
        <Link
          href={`/colleges/${college.id}`}
          className="flex-1 btn-secondary text-xs justify-center py-2"
        >
          <BookOpen size={13} />
          View Details
        </Link>
        <button
          onClick={() => selected ? removeFromCompare(college.id) : addToCompare(college)}
          disabled={!selected && !canAdd}
          className={`p-2 rounded-xl border text-sm transition-all ${
            selected
              ? 'bg-teal text-white border-teal'
              : canAdd
              ? 'border-ink/15 text-ink-muted hover:border-amber hover:text-amber'
              : 'border-ink/8 text-ink-faint cursor-not-allowed'
          }`}
          title={selected ? 'Remove from compare' : canAdd ? 'Add to compare' : 'Max 3 colleges'}
        >
          {selected ? <Check size={14} /> : <Plus size={14} />}
        </button>
      </div>
    </div>
  );
}
