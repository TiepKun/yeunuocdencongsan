"use client";

import { Pause, Play, Rewind, SkipBack, SkipForward } from "lucide-react";
import { useEffect } from "react";

import { timelineEvents } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";

export default function JourneyControls() {
  const isAutoPlaying = useTimelineStore((state) => state.isAutoPlaying);
  const nextEvent = useTimelineStore((state) => state.nextEvent);
  const previousEvent = useTimelineStore((state) => state.previousEvent);
  const selectEvent = useTimelineStore((state) => state.selectEvent);
  const setAutoPlaying = useTimelineStore((state) => state.setAutoPlaying);
  const setReducedMotion = useTimelineStore((state) => state.setReducedMotion);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [setReducedMotion]);

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={previousEvent}
          title="Mốc trước"
          className="journey-pill"
        >
          <SkipBack aria-hidden="true" className="h-4 w-4" />
          <span>TRƯỚC</span>
        </button>
        <button
          type="button"
          onClick={nextEvent}
          title="Mốc sau"
          className="journey-pill"
        >
          <SkipForward aria-hidden="true" className="h-4 w-4" />
          <span>SAU</span>
        </button>
        <button
          type="button"
          onClick={() => setAutoPlaying(!isAutoPlaying)}
          title={isAutoPlaying ? "Tạm dừng" : "Tự động"}
          className="journey-pill journey-pill-primary"
        >
          {isAutoPlaying ? (
            <Pause aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Play aria-hidden="true" className="h-4 w-4" />
          )}
          <span>{isAutoPlaying ? "DỪNG" : "TỰ ĐỘNG"}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setAutoPlaying(false);
            selectEvent(timelineEvents[0].id);
          }}
          title="Về đầu"
          className="journey-pill"
        >
          <Rewind aria-hidden="true" className="h-4 w-4" />
          <span>VỀ ĐẦU</span>
        </button>
      </div>
    </section>
  );
}
