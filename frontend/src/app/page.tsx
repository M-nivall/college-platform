'use client';

import Link from 'next/link';
import { ArrowRight, Star, MapPin, TrendingUp, Search, BookOpen, GitCompare } from 'lucide-react';

const stats = [
  { label: 'Colleges Listed', value: '500+' },
  { label: 'States Covered', value: '28' },
  { label: 'Students Helped', value: '2M+' },
  { label: 'Placement Records', value: '10K+' },
];

const features = [
  {
    icon: Search,
    title: 'Smart Search & Filter',
    desc: 'Find colleges by name, location, fees, and courses with powerful real-time filters.',
    color: 'bg-teal-pale text-teal',
  },
  {
    icon: BookOpen,
    title: 'Detailed Profiles',
    desc: 'Dive deep into placement records, fee structures, courses, and student reviews.',
    color: 'bg-amber-pale text-amber',
  },
  {
    icon: GitCompare,
    title: 'Side-by-Side Compare',
    desc: 'Compare up to 3 colleges across key metrics to make the right decision.',
    color: 'bg-purple-50 text-purple-600',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-cream pt-20 pb-28 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-white/5" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8 border border-white/15">
            <TrendingUp size={14} className="text-amber" />
            <span className="text-cream/80">India's most comprehensive college platform</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.1] tracking-tight mb-6">
            Find your{' '}
            <span className="italic text-amber">perfect</span>
            <br />
            college match
          </h1>

          <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore, compare, and choose from hundreds of top colleges across India. 
            Make data-driven decisions with real placement stats, fees, and reviews.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/colleges"
              className="inline-flex items-center justify-center gap-2 bg-amber text-ink px-8 py-4 rounded-full font-semibold text-base hover:bg-amber-light transition-all group"
            >
              Explore Colleges
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-cream px-8 py-4 rounded-full font-medium text-base hover:bg-white/10 transition-all"
            >
              <GitCompare size={16} />
              Compare Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-lifted border border-ink/8 grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 text-center ${i < stats.length - 1 ? 'border-r border-ink/8' : ''}`}
            >
              <div className="font-display text-3xl font-semibold text-ink mb-1">{stat.value}</div>
              <div className="text-sm text-ink-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <div className="text-center mb-14">
          <h2 className="section-title mb-4">Everything you need to decide</h2>
          <p className="text-ink-muted text-lg max-w-xl mx-auto">
            We've built the tools to make your college search simpler, smarter, and more confident.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card p-7 hover:-translate-y-1 transition-transform">
              <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-5`}>
                <f.icon size={22} />
              </div>
              <h3 className="font-semibold text-ink text-lg mb-2">{f.title}</h3>
              <p className="text-ink-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="bg-ink rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber/10 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal/10 rounded-full translate-y-1/2 -translate-x-1/4" />
          </div>
          <div className="relative">
            <h2 className="font-display text-4xl font-semibold text-cream mb-4">
              Start your search today
            </h2>
            <p className="text-cream/60 mb-8 max-w-md mx-auto">
              Thousands of students use EduFind to make their most important decision.
            </p>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 bg-amber text-ink px-8 py-4 rounded-full font-semibold hover:bg-amber-light transition-all group"
            >
              Browse All Colleges
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
