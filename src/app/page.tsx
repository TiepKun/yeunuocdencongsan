"use client";

import dynamic from "next/dynamic";

import DetailPanel from "@/components/DetailPanel";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import TimelineBar from "@/components/TimelineBar";

const TimelineScene = dynamic(() => import("@/components/TimelineScene"), {
  ssr: false,
  loading: () => <LoadingScreen />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-coal text-ivory">
      <Hero />

      <section
        id="journey"
        className="relative isolate overflow-hidden px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="museum-section-light" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-[1540px] gap-5 xl:grid-cols-[minmax(0,1fr)_410px]">
          <div className="min-w-0 space-y-5">
            <TimelineScene />
            <TimelineBar />
          </div>
          <DetailPanel />
        </div>
      </section>
    </main>
  );
}
