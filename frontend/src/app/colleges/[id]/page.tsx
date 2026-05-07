'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { collegeApi } from '@/lib/api';
import { formatFees, formatPackage, getTypeColor, getRatingColor } from '@/lib/utils';
import {
  MapPin, Star, TrendingUp, BookOpen, ArrowLeft, Globe, Award, Users, GitCompare, Check, Plus
} from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

export default function CollegeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addToCompare, removeFromCompare, isSelected, canAdd } = useCompare();

  const { data: college, isLoading, isError } = useQuery({
    queryKey: ['college', id],
    queryFn: () => collegeApi.getCollege(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-ink/10 border-t-amber rounded-full animate-spin mx-auto mb-4" />
          <p className="text-ink-muted">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (isError || !college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-semibold mb-2">College not found</h2>
          <button onClick={() => router.back()} className="btn-secondary">Go back</button>
        </div>
      </div>
    );
  }

  const selected = isSelected(college.id);
  const latestPlacement = college.placements?.[0];

  return (
    <div className="min-h-screen pb-16">
      {/* Hero */}
      <div className="bg-ink text-cream">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-cream/50 hover:text-cream text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to colleges
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`badge ${getTypeColor(college.type)}`}>{college.type}</span>
                {college.naacGrade && (
                  <span className="badge bg-amber-pale text-amber">NAAC {college.naacGrade}</span>
                )}
                {college.nirfRank && (
                  <span className="badge bg-white/10 text-cream font-mono">NIRF #{college.nirfRank}</span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3 leading-tight">
                {college.name}
              </h1>
              <div className="flex items-center gap-2 text-cream/60">
                <MapPin size={14} />
                <span>{college.location}</span>
                {college.established && (
                  <>
                    <span className="text-cream/30">·</span>
                    <span>Est. {college.established}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-cream/70 hover:text-cream"
                >
                  <Globe size={14} /> Website
                </a>
              )}
              <button
                onClick={() => selected ? removeFromCompare(college.id) : addToCompare(college)}
                disabled={!selected && !canAdd}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selected
                    ? 'bg-teal text-white'
                    : canAdd
                    ? 'bg-white/10 text-cream hover:bg-white/20'
                    : 'bg-white/5 text-cream/40 cursor-not-allowed'
                }`}
              >
                {selected ? <Check size={14} /> : <GitCompare size={14} />}
                {selected ? 'Added' : 'Compare'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lifted border border-ink/8 grid grid-cols-2 md:grid-cols-4">
          <div className="p-5 text-center border-r border-ink/8">
            <div className={`inline-flex items-center gap-1 text-2xl font-bold font-display rounded-xl px-3 py-1 ${getRatingColor(college.rating)}`}>
              <Star size={16} className="fill-current" />
              {college.rating.toFixed(1)}
            </div>
            <div className="text-xs text-ink-muted mt-1">Overall Rating</div>
          </div>
          <div className="p-5 text-center border-r border-ink/8">
            <div className="text-2xl font-bold font-mono text-ink">{formatFees(college.totalFees)}</div>
            <div className="text-xs text-ink-muted mt-1">Total Fees</div>
          </div>
          <div className="p-5 text-center border-r border-ink/8">
            {latestPlacement ? (
              <>
                <div className="text-2xl font-bold font-mono text-teal">{latestPlacement.placementRate}%</div>
                <div className="text-xs text-ink-muted mt-1">Placement Rate ({latestPlacement.year})</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-ink-faint">—</div>
                <div className="text-xs text-ink-muted mt-1">Placement Rate</div>
              </>
            )}
          </div>
          <div className="p-5 text-center">
            {latestPlacement ? (
              <>
                <div className="text-2xl font-bold font-mono text-amber">{formatPackage(latestPlacement.avgPackage)}</div>
                <div className="text-xs text-ink-muted mt-1">Avg Package</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-ink-faint">—</div>
                <div className="text-xs text-ink-muted mt-1">Avg Package</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2 space-y-8">
          {/* About */}
          {college.description && (
            <section className="card p-6">
              <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
                <BookOpen size={18} className="text-teal" /> About
              </h2>
              <p className="text-ink-muted leading-relaxed">{college.description}</p>
            </section>
          )}

          {/* Courses */}
          {college.courses && college.courses.length > 0 && (
            <section className="card p-6">
              <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <Award size={18} className="text-amber" /> Courses Offered
              </h2>
              <div className="space-y-3">
                {college.courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 bg-cream rounded-xl border border-ink/8"
                  >
                    <div>
                      <div className="font-medium text-ink">{course.name}</div>
                      <div className="text-sm text-ink-muted mt-0.5">
                        <span className="badge bg-cream-deep text-ink-muted mr-2">{course.degree}</span>
                        {course.duration} years
                        {course.seats && <span className="ml-2">· {course.seats} seats</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-ink">{formatFees(course.fees)}</div>
                      <div className="text-xs text-ink-muted">per year</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Placements */}
          {college.placements && college.placements.length > 0 && (
            <section className="card p-6">
              <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-teal" /> Placement Statistics
              </h2>
              <div className="space-y-4">
                {college.placements.map((p) => (
                  <div key={p.id} className="border-b border-ink/8 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-ink">Batch of {p.year}</span>
                      <span className="badge bg-teal-pale text-teal">{p.placementRate}% placed</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-ink-muted mb-1">Average Package</div>
                        <div className="font-mono font-semibold text-ink">{formatPackage(p.avgPackage)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-ink-muted mb-1">Highest Package</div>
                        <div className="font-mono font-semibold text-amber">{formatPackage(p.highestPackage)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-ink-muted mb-1">Placement Rate</div>
                        <div className="font-semibold text-teal">{p.placementRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          {college.reviews && college.reviews.length > 0 && (
            <section className="card p-6">
              <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <Users size={18} className="text-amber" /> Student Reviews
              </h2>
              <div className="space-y-4">
                {college.reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-cream rounded-xl border border-ink/8">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="font-medium text-ink">{r.author}</span>
                        <span className="text-xs text-ink-faint ml-2">· Batch {r.year}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber">
                        <Star size={13} className="fill-amber" />
                        <span className="text-sm font-medium">{r.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick info */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-4">Quick Info</h3>
            <div className="space-y-3">
              {[
                { label: 'Type', value: college.type },
                { label: 'Location', value: college.location },
                { label: 'Established', value: college.established?.toString() ?? '—' },
                { label: 'NAAC Grade', value: college.naacGrade ?? '—' },
                { label: 'NIRF Rank', value: college.nirfRank ? `#${college.nirfRank}` : '—' },
                { label: 'Total Seats', value: college.totalSeats?.toLocaleString('en-IN') ?? '—' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-ink-muted">{item.label}</span>
                  <span className="font-medium text-ink">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compare CTA */}
          <div className="card p-5 bg-ink text-cream">
            <h3 className="font-semibold mb-2">Compare this college</h3>
            <p className="text-cream/50 text-sm mb-4">Add more colleges and compare side by side.</p>
            <button
              onClick={() => selected ? removeFromCompare(college.id) : addToCompare(college)}
              disabled={!selected && !canAdd}
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                selected
                  ? 'bg-teal text-white'
                  : canAdd
                  ? 'bg-amber text-ink hover:bg-amber-light'
                  : 'bg-white/10 text-cream/40 cursor-not-allowed'
              }`}
            >
              {selected ? '✓ Added to compare' : canAdd ? '+ Add to compare' : 'Max 3 selected'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
