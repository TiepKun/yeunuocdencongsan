"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, MapPin, Quote, X } from "lucide-react";

import { getTimelineEvent, phaseMeta } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";

import HistoricalImageGallery from "./HistoricalImageGallery";

export default function DetailPanel() {
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const isDetailOpen = useTimelineStore((state) => state.isDetailOpen);
  const closeDetail = useTimelineStore((state) => state.closeDetail);
  const event = getTimelineEvent(selectedEventId);
  const phase = phaseMeta[event.phase];

  return (
    <AnimatePresence>
      {isDetailOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-end bg-black/46 p-3 backdrop-blur-sm sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Đóng mô tả chi tiết"
            className="absolute inset-0 cursor-default"
            onClick={closeDetail}
          />
          <motion.aside
            key={event.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-panel-title"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 28 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="glass-panel relative z-10 max-h-[calc(100vh-2rem)] w-full max-w-[520px] overflow-y-auto px-5 py-5 text-ivory shadow-museum sm:max-h-[calc(100vh-2.5rem)] sm:px-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div
                className="inline-flex items-center gap-2 border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em]"
                style={{
                  borderColor: `${phase.glow}66`,
                  color: phase.glow,
                  backgroundColor: `${phase.accent}18`
                }}
              >
                {phase.label}
              </div>
              <button
                type="button"
                aria-label="Đóng mô tả"
                onClick={closeDetail}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-black/30 text-ivory/70 transition hover:border-brass/70 hover:text-ivory focus:outline-none focus:ring-2 focus:ring-brass"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brass">
                  {event.year}
                </p>
                <h2
                  id="detail-panel-title"
                  className="mt-2 text-2xl font-semibold leading-snug text-ivory"
                >
                  {event.title}
                </h2>
              </div>

              <div className="flex items-start gap-2 text-sm text-ivory/72">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 text-brass"
                />
                <span>{event.location}</span>
              </div>

              <section className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-brass">
                  <BookOpen aria-hidden="true" className="h-4 w-4" />
                  Nội dung lịch sử
                </div>
                <p className="text-sm leading-7 text-ivory/78">
                  {event.detail}
                </p>
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
                <h3 className="text-sm font-semibold text-brass">
                  Mô hình 3D
                </h3>
                {event.models3d?.length ? (
                  <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-ivory/72">
                    {event.models3d.map((model) => (
                      <li key={model.src}>{model.label}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-7 text-ivory/70">
                    {event.missingModelDescription ??
                      "Chưa có mô hình GLB tương ứng cho giai đoạn này."}
                  </p>
                )}
              </section>

              <section className="space-y-3 border-t border-white/10 pt-4">
                <h3 className="text-sm font-semibold text-brass">
                  Tư liệu ảnh
                </h3>
                <HistoricalImageGallery images={event.images} />
              </section>

              <p className="border-t border-white/10 pt-4 text-xs leading-5 text-ivory/50">
                Ghi chú nguồn: Theo giáo trình Tư tưởng Hồ Chí Minh và bộ tư
                liệu lịch sử về Chủ tịch Hồ Chí Minh.
              </p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
