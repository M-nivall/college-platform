'use client';

import { useCompare } from '@/context/CompareContext';
import { useRouter } from 'next/navigation';
import { GitCompare, X } from 'lucide-react';

export default function CompareBar() {
  const { selectedColleges, removeFromCompare, clearCompare } = useCompare();
  const router = useRouter();

  if (selectedColleges.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="bg-ink text-cream rounded-2xl shadow-lifted px-5 py-3 flex items-center gap-4">
        <GitCompare size={18} className="text-amber flex-shrink-0" />
        <div className="flex-1 flex gap-2 overflow-x-auto">
          {selectedColleges.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-xs whitespace-nowrap"
            >
              <span className="max-w-[120px] truncate">{c.name}</span>
              <button
                onClick={() => removeFromCompare(c.id)}
                className="text-cream/50 hover:text-cream transition-colors"
              >
                <X size={11} />
              </button>
            </div>
          ))}
          {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
            <div
              key={i}
              className="flex items-center border border-dashed border-white/20 rounded-full px-3 py-1 text-xs text-cream/30 whitespace-nowrap"
            >
              + Add college
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearCompare}
            className="text-xs text-cream/50 hover:text-cream transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => router.push('/compare')}
            className="bg-amber text-ink text-xs font-medium px-4 py-2 rounded-full hover:bg-amber-light transition-colors whitespace-nowrap"
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
}
