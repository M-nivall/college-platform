'use client';

import { useQuery } from '@tanstack/react-query';
import { useCompare } from '@/context/CompareContext';
import { collegeApi } from '@/lib/api';
import { formatFees, formatPackage } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GitCompare, X, Plus, Star, TrendingUp, ArrowLeft, Trophy } from 'lucide-react';

function getBestIndex(values: (number | string | null)[], lowerIsBetter = false): number | null {
  const nums = values.map((v) => (typeof v === 'number' ? v : null));
  const valid = nums.filter((v): v is number => v !== null);
  if (valid.length === 0) return null;
  const best = lowerIsBetter ? Math.min(...valid) : Math.max(...valid);
  return nums.indexOf(best);
}

function formatValue(value: number | string | null, unit?: string, key?: string): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string') return value;
  if (key === 'totalFees') return formatFees(value);
  if (key === 'avgPackage' || key === 'highestPackage') return formatPackage(value);
  if (unit === '%') return `${value}%`;
  if (unit === '₹') return formatFees(value);
  if (unit === '/5') return `${value}/5`;
  if (unit === '#') return `#${value}`;
  return value.toString();
}

const CARD_COLORS = ['bg-teal/10 border-teal/30', 'bg-amber/10 border-amber/30', 'bg-purple-500/10 border-purple-500/30'];
const HEADER_COLORS = ['bg-teal text-white', 'bg-amber text-ink', 'bg-purple-500 text-white'];

export default function ComparePage() {
  const { selectedColleges, removeFromCompare, clearCompare } = useCompare();
  const router = useRouter();

  const canCompare = selectedColleges.length >= 2;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['compare', selectedColleges.map((c) => c.id).sort().join(',')],
    queryFn: () => collegeApi.compareColleges(selectedColleges.map((c) => c.id)),
    enabled: canCompare,
  });

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="bg-ink text-cream py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-cream/50 hover:text-cream text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber/20 rounded-xl flex items-center justify-center">
              <GitCompare size={20} className="text-amber" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold">Compare Colleges</h1>
              <p className="text-cream/50 text-sm">Side-by-side comparison to help you decide</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Selected colleges pills */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {selectedColleges.map((c, i) => (
            <div key={c.id} className={`flex items-center gap-2 border rounded-xl px-4 py-2 ${CARD_COLORS[i]}`}>
              <div className={`w-3 h-3 rounded-full ${HEADER_COLORS[i].split(' ')[0]}`} />
              <span className="font-medium text-sm text-ink">{c.name}</span>
              <button
                onClick={() => removeFromCompare(c.id)}
                className="text-ink-muted hover:text-ink transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          ))}
          {selectedColleges.length < 3 && (
            <Link
              href="/colleges"
              className="flex items-center gap-2 border border-dashed border-ink/20 rounded-xl px-4 py-2 text-sm text-ink-muted hover:text-ink hover:border-ink/40 transition-all"
            >
              <Plus size={14} /> Add college
            </Link>
          )}
          {selectedColleges.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-sm text-amber hover:underline ml-auto"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Empty state */}
        {selectedColleges.length === 0 && (
          <div className="text-center py-20 card p-12">
            <GitCompare size={48} className="text-ink-faint mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-ink mb-2">No colleges selected</h2>
            <p className="text-ink-muted mb-6 max-w-xs mx-auto">
              Go to the colleges listing and add 2–3 colleges to compare.
            </p>
            <Link href="/colleges" className="btn-primary">
              Browse Colleges
            </Link>
          </div>
        )}

        {/* Need more */}
        {selectedColleges.length === 1 && (
          <div className="text-center py-12 card p-12">
            <p className="text-ink-muted mb-4">Add at least one more college to start comparing.</p>
            <Link href="/colleges" className="btn-primary">
              <Plus size={14} /> Add another college
            </Link>
          </div>
        )}

        {/* Loading */}
        {canCompare && isLoading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-ink/10 border-t-amber rounded-full animate-spin mx-auto mb-4" />
            <p className="text-ink-muted">Building comparison...</p>
          </div>
        )}

        {/* Error */}
        {canCompare && isError && (
          <div className="text-center py-20 text-red-500">
            Failed to load comparison. Please try again.
          </div>
        )}

        {/* Comparison table */}
        {data && (
          <div className="space-y-6">
            {/* College headers */}
            <div className={`grid gap-4 ${data.colleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
              <div className="flex items-end pb-4">
                <span className="text-sm text-ink-muted font-medium uppercase tracking-wide">Metric</span>
              </div>
              {data.colleges.map((c, i) => (
                <div key={c.id} className={`card p-5 text-center relative overflow-hidden`}>
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${HEADER_COLORS[i].split(' ')[0]}`} />
                  <Link
                    href={`/colleges/${c.id}`}
                    className="font-display font-semibold text-ink hover:text-amber transition-colors text-sm leading-snug block mb-2"
                  >
                    {c.name}
                  </Link>
                  <div className="text-xs text-ink-muted">{c.city}, {c.state}</div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star size={11} className="text-amber fill-amber" />
                    <span className="text-xs font-medium">{c.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics rows */}
            <div className="card overflow-hidden">
              {data.metrics.map((metric, metricIdx) => {
                const numericValues = metric.values.map((v) => (typeof v.value === 'number' ? v.value : null));
                const bestIdx = getBestIndex(numericValues, metric.values[0]?.lowerIsBetter);

                return (
                  <div
                    key={metric.key}
                    className={`grid gap-4 p-4 ${data.colleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'} ${metricIdx % 2 === 0 ? 'bg-white' : 'bg-cream/50'} border-b border-ink/5 last:border-0`}
                  >
                    {/* Metric label */}
                    <div className="flex items-center">
                      <span className="text-sm text-ink-muted font-medium">{metric.label}</span>
                    </div>

                    {/* Values */}
                    {metric.values.map((val, valIdx) => {
                      const isBest = bestIdx === valIdx && numericValues.filter((n) => n !== null).length > 1;
                      return (
                        <div key={val.collegeId} className={`text-center relative ${isBest ? 'font-semibold' : ''}`}>
                          {isBest && (
                            <Trophy size={12} className="absolute -top-1 right-1/4 text-amber" />
                          )}
                          <span
                            className={`text-sm ${
                              isBest
                                ? 'text-teal'
                                : val.value === null
                                ? 'text-ink-faint'
                                : 'text-ink'
                            }`}
                          >
                            {formatValue(val.value, val.unit, metric.key)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Verdict */}
            <div className="card p-6 bg-ink text-cream">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-amber" />
                <h3 className="font-display text-xl font-semibold">Quick Verdict</h3>
              </div>
              <div className={`grid gap-4 ${data.colleges.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {data.colleges.map((c, i) => {
                  const wins = data.metrics.filter((m) => {
                    const nums = m.values.map((v) => (typeof v.value === 'number' ? v.value : null));
                    const bi = getBestIndex(nums, m.values[0]?.lowerIsBetter);
                    return bi === i && nums.filter((n) => n !== null).length > 1;
                  }).length;
                  return (
                    <div key={c.id} className="bg-white/10 rounded-xl p-4">
                      <div className="text-xs text-cream/50 mb-1">{c.name}</div>
                      <div className="text-2xl font-bold text-amber">{wins}</div>
                      <div className="text-xs text-cream/50">metrics won</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
