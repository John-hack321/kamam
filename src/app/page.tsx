'use client';

import dynamic from 'next/dynamic';
import Hero from './components/Hero';

// Dynamically import components with no SSR to avoid hydration issues
const ApologyCard = dynamic(() => import('./components/ApologyCard'), { ssr: false });
const FinalSection = dynamic(() => import('./components/FinalSection'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <ApologyCard />
      <FinalSection />
    </main>
  );
}
