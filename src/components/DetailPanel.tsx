"use client";

import { motion } from "framer-motion";
import { BookOpen, MapPin, Quote } from "lucide-react";

import { getTimelineEvent, phaseMeta } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";

import HistoricalImageGallery from "./HistoricalImageGallery";

export default function DetailPanel() {
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const event = getTimelineEvent(selectedEventId);
  const phase = phaseMeta[event.phase];

  return (
    <motion.aside
      key={event.id}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="glass-panel max-h-[calc(100vh-7rem)] overflow-y-auto px-5 py-5 text-ivory lg:sticky lg:top-24"
    >
      <div
        className="mb-5 inline-flex items-center gap-2 border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em]"
        style={{
          borderColor: `${phase.glow}66`,
          color: phase.glow,
          backgroundColor: `${phase.accent}18`
        }}
      >
        {phase.label}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brass">
            {event.year}
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-snug text-ivory">
            {event.title}
          </h2>
        </div>

        <div className="flex items-start gap-2 text-sm text-ivory/72">
          <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 text-brass" />
          <span>{event.location}</span>
        </div>

        <section className="space-y-3 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-brass">
            <BookOpen aria-hidden="true" className="h-4 w-4" />
            Nội dung lịch sử
          </div>
          <p className="text-sm leading-7 text-ivory/78">{event.detail}</p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-brass">
            <Quote aria-hidden="true" className="h-4 w-4" />
            Ý nghĩa tư tưởng
          </div>
          <p className="text-sm leading-7 text-ivory/78">
            {event.ideologicalMeaning}
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-4">
          <h3 className="text-sm font-semibold text-brass">Tư liệu ảnh</h3>
          <HistoricalImageGallery images={event.images} />
        </section>

        <p className="border-t border-white/10 pt-4 text-xs leading-5 text-ivory/50">
          Ghi chú nguồn: Theo giáo trình Tư tưởng Hồ Chí Minh / tư liệu ảnh
          được cung cấp.
        </p>
      </div>
    </motion.aside>
  );
}
