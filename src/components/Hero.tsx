"use client";

import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToJourney = () => {
    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative isolate flex min-h-[76vh] items-end overflow-hidden border-b border-white/10 bg-coal px-5 pb-10 pt-24 text-ivory sm:px-8 lg:px-12">
      <div className="museum-backdrop" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-brass/40 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Bảo tàng số 3D
          </div>
          <h1 className="max-w-5xl text-4xl font-semibold leading-tight text-ivory sm:text-5xl lg:text-7xl">
            Sự hình thành tư tưởng Hồ Chí Minh 1911-1930
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ivory/78 sm:text-lg">
            Hành trình từ chủ nghĩa yêu nước đến con đường cách mạng vô sản.
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToJourney}
          className="inline-flex min-h-12 w-fit items-center gap-3 border border-brass/70 bg-brass px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-coal shadow-museum transition hover:bg-[#e0b961] focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2 focus:ring-offset-coal"
        >
          Bắt đầu hành trình
          <ArrowDown aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
