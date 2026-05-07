'use client';

import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { CompareProvider } from '@/context/CompareContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000, retry: 1 },
    },
  }));

  return (
    <html lang="en">
      <head>
        <title>EduFind — Discover Your Perfect College</title>
        <meta name="description" content="Discover, compare, and choose the best colleges in India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <CompareProvider>
            <Navbar />
            <main>{children}</main>
          </CompareProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
