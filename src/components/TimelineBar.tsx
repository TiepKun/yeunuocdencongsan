"use client";

import { Pause, Play, Rewind, SkipBack, SkipForward } from "lucide-react";
import { useEffect } from "react";

import { phaseMeta, timelineEvents } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";

export default function TimelineBar() {
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const isAutoPlaying = useTimelineStore((state) => state.isAutoPlaying);
  const reducedMotion = useTimelineStore((state) => state.reducedMotion);
  const selectEvent = useTimelineStore((state) => state.selectEvent);
  const nextEvent = useTimelineStore((state) => state.nextEvent);
  const previousEvent = useTimelineStore((state) => state.previousEvent);
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
    <section className="glass-panel px-4 py-4 text-ivory">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">
            Timeline 2D
          </h2>
          <p className="mt-1 text-xs text-ivory/58">
            Click vào năm để mở chi tiết và đưa camera đến mốc tương ứng.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={previousEvent}
            title="Mốc trước"
            className="timeline-control"
          >
            <SkipBack aria-hidden="true" className="h-4 w-4" />
            <span>Trước</span>
          </button>
          <button
            type="button"
            onClick={nextEvent}
            title="Mốc sau"
            className="timeline-control"
          >
            <SkipForward aria-hidden="true" className="h-4 w-4" />
            <span>Sau</span>
          </button>
          <button
            type="button"
            onClick={() => setAutoPlaying(!isAutoPlaying)}
            title={
              isAutoPlaying ? "Tạm dừng timeline" : "Tự động chạy timeline"
            }
            className="timeline-control bg-brass text-coal hover:bg-[#e0b961]"
          >
            {isAutoPlaying ? (
              <Pause aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Play aria-hidden="true" className="h-4 w-4" />
            )}
            <span>{isAutoPlaying ? "Tạm dừng" : "Tự động"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAutoPlaying(false);
              selectEvent(timelineEvents[0].id);
            }}
            title="Quay lại mốc đầu"
            className="timeline-control"
          >
            <Rewind aria-hidden="true" className="h-4 w-4" />
            <span>Về đầu</span>
          </button>
          <label className="inline-flex min-h-10 items-center gap-2 border border-white/10 bg-black/20 px-3 text-xs font-semibold uppercase tracking-[0.08em] text-ivory/70">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(event) => setReducedMotion(event.target.checked)}
              className="h-4 w-4 accent-brass"
            />
            Giảm chuyển động
          </label>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="relative flex min-w-[1040px] items-stretch gap-3">
          <div className="absolute left-5 right-5 top-5 h-px bg-gradient-to-r from-[#74b8d8] via-[#ffd36a] to-[#9f2f2b]" />
          {timelineEvents.map((event) => {
            const selected = event.id === selectedEventId;
            const phase = phaseMeta[event.phase];

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => selectEvent(event.id)}
                className="relative z-10 flex w-28 shrink-0 flex-col items-center gap-3 pt-1 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
                title={`${event.year} - ${event.title}`}
              >
                <span
                  className="h-9 w-9 border transition"
                  style={{
                    borderColor: selected ? phase.glow : `${phase.accent}88`,
                    backgroundColor: selected ? phase.glow : "#0b1118",
                    boxShadow: selected
                      ? `0 0 26px ${phase.glow}88`
                      : `0 0 14px ${phase.accent}33`
                  }}
                />
                <span
                  className={`min-h-20 w-full border px-2 py-3 transition ${
                    selected
                      ? "border-brass bg-brass/15 text-ivory"
                      : "border-white/10 bg-black/20 text-ivory/62 hover:border-brass/50 hover:text-ivory"
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    {event.year}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-[11px] leading-4">
                    {event.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
