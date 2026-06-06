"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { PointerEvent, useRef } from "react";

import { phaseMeta, timelineEvents } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";

const SCROLL_STEP = 320;

export default function TimelineBar() {
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const selectEvent = useTimelineStore((state) => state.selectEvent);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const scrollByStep = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -SCROLL_STEP : SCROLL_STEP,
      behavior: "smooth"
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) {
      return;
    }

    dragging.current = true;
    startX.current = event.clientX;
    startScrollLeft.current = scrollRef.current.scrollLeft;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !scrollRef.current) {
      return;
    }

    const delta = event.clientX - startX.current;
    scrollRef.current.scrollLeft = startScrollLeft.current - delta;
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section className="glass-panel timeline-panel px-4 py-5 text-ivory">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-black uppercase tracking-[0.18em] text-brass">
          Timeline 2D
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Kéo timeline sang trái"
            className="timeline-scroll-button"
            onClick={() => scrollByStep("left")}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Kéo timeline sang phải"
            className="timeline-scroll-button"
            onClick={() => scrollByStep("right")}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="timeline-scroll overflow-x-auto pb-3"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={() => {
          dragging.current = false;
        }}
      >
        <div className="relative flex min-w-[1180px] items-stretch gap-3 pr-2">
          <div className="absolute left-5 right-5 top-5 h-px bg-gradient-to-r from-[#7fb98f] via-[#f2c96a] to-[#a93f42]" />
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
                  className="h-9 w-9 rounded-full border transition"
                  style={{
                    borderColor: selected ? phase.glow : `${phase.accent}88`,
                    backgroundColor: selected ? phase.glow : "#091219",
                    boxShadow: selected
                      ? `0 0 26px ${phase.glow}88`
                      : `0 0 14px ${phase.accent}33`
                  }}
                />
                <span
                  className={`min-h-20 w-full rounded-lg border px-2 py-3 transition ${
                    selected
                      ? "text-ivory"
                      : "text-ivory/68 hover:text-ivory"
                  }`}
                  style={{
                    borderColor: selected ? phase.glow : `${phase.accent}44`,
                    background: selected
                      ? `linear-gradient(180deg, ${phase.accent}38, rgba(7, 13, 17, 0.9))`
                      : "linear-gradient(180deg, rgba(10, 18, 23, 0.82), rgba(5, 9, 13, 0.72))",
                    boxShadow: selected
                      ? `0 16px 34px ${phase.accent}26, inset 0 1px 0 rgba(244, 234, 215, 0.12)`
                      : "inset 0 1px 0 rgba(244, 234, 215, 0.05)"
                  }}
                >
                  <span className="block text-sm font-black">
                    {event.year}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-[11px] font-semibold leading-4">
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
