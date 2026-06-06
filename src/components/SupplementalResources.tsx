"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { X } from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { getTimelineEvent } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";
import type { TimelineImage } from "@/types/timeline";

import { EventSymbol } from "./TimelineNode";

const fallbackSrc = "/historical-assets/placeholder.jpg";

function ResourceModel() {
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const event = getTimelineEvent(selectedEventId);

  return (
    <>
      <color attach="background" args={["#080b10"]} />
      <ambientLight intensity={0.76} />
      <directionalLight position={[3, 5, 5]} intensity={1.8} />
      <pointLight position={[-2.2, 2.6, 2.8]} color="#c99a4a" intensity={1.4} />
      <group position={[0, -0.05, 0]} scale={1.35}>
        <EventSymbol event={event} active modelScope="preview" />
      </group>
      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.72}
        zoomSpeed={0.9}
        enablePan={false}
        minDistance={2.2}
        maxDistance={7}
      />
    </>
  );
}

export default function SupplementalResources() {
  const sectionRef = useRef<HTMLElement>(null);
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const event = getTimelineEvent(selectedEventId);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [modelPreviewReady, setModelPreviewReady] = useState(false);
  const [selectedResource, setSelectedResource] = useState<{
    eventId: string;
    image: TimelineImage;
  } | null>(null);
  const images = useMemo(() => {
    return event.images.filter((image) => image.src !== fallbackSrc);
  }, [event.images]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || modelPreviewReady) {
      return;
    }

    const maybeLoadPreview = () => {
      const rect = section.getBoundingClientRect();
      const previewIsClearlyVisible =
        rect.top < window.innerHeight * 0.4 && rect.bottom > 160;

      if (window.scrollY > 120 && previewIsClearlyVisible) {
        setModelPreviewReady(true);
      }
    };

    const initialCheck = window.requestAnimationFrame(maybeLoadPreview);

    window.addEventListener("scroll", maybeLoadPreview, { passive: true });
    window.addEventListener("resize", maybeLoadPreview);

    return () => {
      window.cancelAnimationFrame(initialCheck);
      window.removeEventListener("scroll", maybeLoadPreview);
      window.removeEventListener("resize", maybeLoadPreview);
    };
  }, [modelPreviewReady]);

  const selectedImage =
    selectedResource?.eventId === selectedEventId
      ? selectedResource.image
      : null;
  const selectedImageSrc =
    selectedImage && failedImages[selectedImage.src]
      ? fallbackSrc
      : selectedImage?.src;

  return (
    <section ref={sectionRef} className="px-4 pb-12 sm:px-6 lg:px-8">
      <div className="glass-panel mx-auto max-w-[1540px] p-4 text-ivory lg:p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-brass">
            Tư liệu ảnh bổ sung
          </h2>
          <p className="max-w-2xl text-right text-xs font-semibold uppercase tracking-[0.14em] text-ivory/58">
            {event.year} · {event.title}
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
          <div className="min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-black/25 lg:min-h-[520px]">
            {modelPreviewReady ? (
              <Canvas
                dpr={[1, 1.3]}
                camera={{
                  position: [0, 1.4, 4.6],
                  fov: 42,
                  near: 0.1,
                  far: 40
                }}
                gl={{
                  antialias: true,
                  powerPreference: "high-performance"
                }}
              >
                <Suspense fallback={null}>
                  <ResourceModel />
                </Suspense>
              </Canvas>
            ) : (
              <div className="flex min-h-[360px] items-center justify-center px-6 text-center text-sm font-semibold uppercase tracking-[0.16em] text-ivory/48 lg:min-h-[520px]">
                Kéo xuống để tải mô hình 3D
              </div>
            )}
          </div>

          <div className="grid max-h-[560px] gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
            {images.length ? (
              images.map((image) => {
                const src = failedImages[image.src] ? fallbackSrc : image.src;

                return (
                  <button
                    key={image.src}
                    type="button"
                    className="group overflow-hidden rounded-lg border border-white/10 bg-black/20 text-left transition hover:border-brass/60 focus:outline-none focus:ring-2 focus:ring-brass"
                    onClick={() =>
                      setSelectedResource({ eventId: event.id, image })
                    }
                  >
                    <div className="relative aspect-[4/3] w-full bg-black/30">
                      <Image
                        src={src}
                        alt={image.caption}
                        fill
                        sizes="(min-width: 1024px) 360px, 92vw"
                        className="object-contain p-2 transition duration-200 group-hover:scale-[1.02]"
                        onError={() => {
                          if (image.src !== fallbackSrc) {
                            setFailedImages((current) => ({
                              ...current,
                              [image.src]: true
                            }));
                          }
                        }}
                      />
                    </div>
                    <p className="line-clamp-3 border-t border-white/10 px-3 py-3 text-xs leading-5 text-ivory/72">
                      {image.caption}
                    </p>
                  </button>
                );
              })
            ) : (
              <div className="col-span-full flex min-h-44 items-center justify-center rounded-lg border border-white/10 bg-black/20 px-6 text-center text-sm text-ivory/60">
                Chưa có tư liệu ảnh thật. Các mốc thiếu ảnh vẫn được ghi chú trong chi tiết sự kiện.
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedImage && selectedImageSrc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="supplemental-image-title"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/72 p-3 backdrop-blur-sm sm:p-6"
        >
          <button
            type="button"
            aria-label="Đóng chi tiết ảnh"
            className="absolute inset-0 cursor-default"
            onClick={() => setSelectedResource(null)}
          />
          <div className="relative z-10 grid max-h-[calc(100vh-2rem)] w-full max-w-6xl overflow-hidden rounded-lg border border-white/12 bg-[#081016] shadow-museum md:grid-cols-[minmax(0,1.35fr)_360px]">
            <div className="relative min-h-[320px] bg-black/45 md:min-h-[620px]">
              <Image
                src={selectedImageSrc}
                alt={selectedImage.caption}
                fill
                sizes="(min-width: 768px) 70vw, 94vw"
                className="object-contain p-4"
                onError={() => {
                  if (selectedImage.src !== fallbackSrc) {
                    setFailedImages((current) => ({
                      ...current,
                      [selectedImage.src]: true
                    }));
                  }
                }}
              />
            </div>
            <aside className="max-h-[calc(100vh-2rem)] overflow-y-auto border-t border-white/10 p-5 md:border-l md:border-t-0">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brass">
                    {event.year}
                  </p>
                  <h3
                    id="supplemental-image-title"
                    className="mt-2 text-xl font-semibold leading-snug text-ivory"
                  >
                    {event.title}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Đóng popup ảnh"
                  onClick={() => setSelectedResource(null)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-black/30 text-ivory/70 transition hover:border-brass/70 hover:text-ivory focus:outline-none focus:ring-2 focus:ring-brass"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              <dl className="space-y-4 text-sm leading-6">
                <div>
                  <dt className="font-semibold text-brass">Địa điểm</dt>
                  <dd className="mt-1 text-ivory/76">{event.location}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-brass">Chú thích ảnh</dt>
                  <dd className="mt-1 text-ivory/82">{selectedImage.caption}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-brass">Liên hệ sự kiện</dt>
                  <dd className="mt-1 text-ivory/72">
                    {event.shortDescription}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-brass">Nguồn tư liệu</dt>
                  <dd className="mt-1 text-ivory/58">
                    {selectedImage.sourceNote}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      )}
    </section>
  );
}
