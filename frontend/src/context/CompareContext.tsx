'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { College } from '@/types';

interface CompareContextType {
  selectedColleges: College[];
  addToCompare: (college: College) => void;
  removeFromCompare: (id: string) => void;
  isSelected: (id: string) => boolean;
  clearCompare: () => void;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);

  const addToCompare = useCallback((college: College) => {
    setSelectedColleges((prev) => {
      if (prev.length >= 3 || prev.find((c) => c.id === college.id)) return prev;
      return [...prev, college];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setSelectedColleges((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedColleges.some((c) => c.id === id),
    [selectedColleges]
  );

  const clearCompare = useCallback(() => setSelectedColleges([]), []);

  return (
    <CompareContext.Provider
      value={{
        selectedColleges,
        addToCompare,
        removeFromCompare,
        isSelected,
        clearCompare,
        canAdd: selectedColleges.length < 3,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
