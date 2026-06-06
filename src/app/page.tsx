"use client";

import dynamic from "next/dynamic";

import DetailPanel from "@/components/DetailPanel";
import JourneyControls from "@/components/JourneyControls";
import LoadingScreen from "@/components/LoadingScreen";
import SupplementalResources from "@/components/SupplementalResources";
import ThemeToggle from "@/components/ThemeToggle";

const TimelineScene = dynamic(() => import("@/components/TimelineScene"), {
  ssr: false,
  loading: () => <LoadingScreen />
});

export default function Home() {
  return (
    <main className="app-shell min-h-screen text-ivory">
      <ThemeToggle />
      <section
        id="journey"
        className="relative isolate overflow-hidden"
      >
        <div className="museum-section-light" aria-hidden="true" />
        <div className="relative z-10">
          <TimelineScene />
          <JourneyControls />
          <SupplementalResources />
        </div>
      </section>
      <DetailPanel />
    </main>
  );
}
