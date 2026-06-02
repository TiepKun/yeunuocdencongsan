"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { Suspense, useMemo, useState } from "react";

import { getTimelineEvent, timelineEvents } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";

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
        <EventSymbol event={event} active />
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
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const images = useMemo(() => {
    const map = new Map<string, string>();

    for (const event of timelineEvents) {
      for (const image of event.images) {
        if (!map.has(image.src)) {
          map.set(image.src, image.caption);
        }
      }
    }

    return Array.from(map, ([src, caption]) => ({ src, caption }));
  }, []);

  return (
    <section className="px-4 pb-12 sm:px-6 lg:px-8">
      <div className="glass-panel mx-auto max-w-[1540px] p-4 text-ivory lg:p-5">
        <h2 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-brass">
          Tư liệu ảnh bổ sung
        </h2>
        <div className="grid gap-5 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
          <div className="min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-black/25 lg:min-h-[520px]">
            <Canvas
              dpr={[1, 1.45]}
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
          </div>

          <div className="grid max-h-[520px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
            {images.map((image) => {
              const src = failedImages[image.src] ? fallbackSrc : image.src;

              return (
                <div
                  key={image.src}
                  className="overflow-hidden rounded-lg border border-white/10 bg-black/20"
                >
                  <Image
                    src={src}
                    alt={image.caption}
                    width={800}
                    height={500}
                    className="aspect-[16/10] w-full object-cover transition duration-200 hover:scale-[1.03]"
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
