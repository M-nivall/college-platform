'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCompare } from '@/context/CompareContext';
import { GitCompare, GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { selectedColleges } = useCompare();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/colleges', label: 'Colleges' },
    { href: '/compare', label: 'Compare' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-ink/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
              <GraduationCap size={16} className="text-cream" />
            </div>
            <span className="font-display text-xl font-semibold text-ink">EduFind</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  pathname === link.href
                    ? 'bg-ink text-cream'
                    : 'text-ink-muted hover:text-ink hover:bg-cream-deep'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Compare badge + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {selectedColleges.length > 0 && (
              <button
                onClick={() => router.push('/compare')}
                className="flex items-center gap-2 bg-amber-pale text-amber border border-amber/30 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber/20 transition-all"
              >
                <GitCompare size={14} />
                Compare ({selectedColleges.length})
              </button>
            )}
            <Link href="/colleges" className="btn-primary text-sm">
              Explore Colleges
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-cream-deep"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-ink/8 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href ? 'bg-ink text-cream' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {selectedColleges.length > 0 && (
              <button
                onClick={() => { setMobileOpen(false); router.push('/compare'); }}
                className="flex items-center gap-2 px-4 py-3 text-amber text-sm font-medium"
              >
                <GitCompare size={14} />
                Compare ({selectedColleges.length})
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
