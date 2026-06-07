"use client";

import { Edges, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Box, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { Suspense, useMemo, useState } from "react";

import { getTimelineEvent } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";
import type { TimelineImage } from "@/types/timeline";

import { EventSymbol } from "./TimelineNode";

const fallbackSrc = "/historical-assets/placeholder.jpg";

function MuseumDisplayRoom({ theme }: { theme: "dark" | "light" }) {
  const isLight = theme === "light";
  const wall = isLight ? "#e5ded2" : "#151e24";
  const inset = isLight ? "#c9bcaa" : "#0c1419";
  const trim = isLight ? "#76572d" : "#bd914a";

  return (
    <group>
      <mesh receiveShadow position={[0, 1.05, -2.35]}>
        <boxGeometry args={[7.2, 4.8, 0.22]} />
        <meshStandardMaterial color={wall} roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[-3.45, 1.05, 0]}>
        <boxGeometry args={[0.18, 4.8, 4.8]} />
        <meshStandardMaterial color={inset} roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[3.45, 1.05, 0]}>
        <boxGeometry args={[0.18, 4.8, 4.8]} />
        <meshStandardMaterial color={inset} roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[0, -0.96, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.2, 5]} />
        <meshStandardMaterial
          color={isLight ? "#a99d8d" : "#091116"}
          roughness={0.82}
          metalness={0.04}
        />
      </mesh>

      <mesh position={[0, 1.68, -2.18]}>
        <boxGeometry args={[2.9, 0.08, 0.08]} />
        <meshStandardMaterial
          color={trim}
          emissive={trim}
          emissiveIntensity={isLight ? 0.04 : 0.26}
          metalness={0.45}
          roughness={0.36}
        />
      </mesh>
      <mesh position={[0, -0.73, 0]} scale={[1.32, 0.24, 0.96]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={isLight ? "#786a58" : "#242d31"}
          roughness={0.55}
          metalness={0.08}
        />
      </mesh>
      <mesh position={[0, -0.57, 0]} scale={[1.2, 0.08, 0.84]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={trim}
          roughness={0.42}
          metalness={0.32}
        />
      </mesh>

      <mesh position={[0, 0.28, 0]} scale={[2.62, 2.02, 1.7]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color={isLight ? "#d9f2f0" : "#8bc7c8"}
          transparent
          opacity={isLight ? 0.055 : 0.035}
          roughness={0.08}
          metalness={0.02}
          transmission={0.2}
          depthWrite={false}
        />
        <Edges color={isLight ? "#8d7654" : "#8eaaab"} />
      </mesh>
    </group>
  );
}

function ResourceModel() {
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const theme = useTimelineStore((state) => state.theme);
  const event = getTimelineEvent(selectedEventId);
  const isLight = theme === "light";

  return (
    <>
      <color attach="background" args={[isLight ? "#d7cfc2" : "#080b10"]} />
      <fog
        attach="fog"
        args={[isLight ? "#d7cfc2" : "#080b10", 7.5, 13]}
      />
      <hemisphereLight
        color={isLight ? "#fff8ec" : "#dce8e8"}
        groundColor={isLight ? "#796d5d" : "#0a1115"}
        intensity={isLight ? 1.2 : 0.42}
      />
      <ambientLight intensity={isLight ? 0.94 : 0.68} />
      <directionalLight
        position={[3, 5, 5]}
        intensity={isLight ? 1.6 : 1.8}
      />
      <pointLight
        position={[-2.2, 2.6, 2.8]}
        color="#c99a4a"
        intensity={isLight ? 0.72 : 1.4}
      />
      <MuseumDisplayRoom theme={theme} />
      <group position={[0, 0.2, 0.05]} scale={1.22}>
        <EventSymbol event={event} active modelScope="preview" />
      </group>
      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.72}
        zoomSpeed={0.9}
        enablePan={false}
        minDistance={2.7}
        maxDistance={7}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  );
}

export default function SupplementalResources() {
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const event = getTimelineEvent(selectedEventId);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [loadedModelEventId, setLoadedModelEventId] = useState<string | null>(null);
  const [activeImageSelection, setActiveImageSelection] = useState({
    eventId: selectedEventId,
    index: 0
  });
  const [selectedResource, setSelectedResource] = useState<{
    eventId: string;
    image: TimelineImage;
  } | null>(null);
  const images = useMemo(() => {
    return event.images.filter((image) => image.src !== fallbackSrc);
  }, [event.images]);
  const previewModels = useMemo(() => {
    return event.models3d?.filter((model) => model.showInPreview !== false) ?? [];
  }, [event.models3d]);
  const modelPreviewReady = loadedModelEventId === selectedEventId;
  const activeImageIndex =
    activeImageSelection.eventId === selectedEventId
      ? activeImageSelection.index
      : 0;
  const activeImage = images[activeImageIndex] ?? images[0];
  const activeImageSrc = activeImage
    ? failedImages[activeImage.src]
      ? fallbackSrc
      : activeImage.src
    : null;
  const previewModelLabel =
    previewModels.map((model) => model.label).join(" · ") || event.title;

  const showPreviousImage = () => {
    setActiveImageSelection({
      eventId: selectedEventId,
      index: activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1
    });
  };

  const showNextImage = () => {
    setActiveImageSelection({
      eventId: selectedEventId,
      index: (activeImageIndex + 1) % images.length
    });
  };

  const selectedImage =
    selectedResource?.eventId === selectedEventId
      ? selectedResource.image
      : null;
  const selectedImageSrc =
    selectedImage && failedImages[selectedImage.src]
      ? fallbackSrc
      : selectedImage?.src;

  return (
    <section className="resource-section pb-12">
      <div className="resource-heading">
        <div>
          <p>Tư liệu mô hình 3D</p>
          <h2>Mô hình 3D riêng cho từng mốc</h2>
        </div>
        <span>
          {event.year} · {event.title}
        </span>
      </div>

      <div className="museum-viewer">
        <div className="museum-viewer-label">
          <span>Mô hình 3D chi tiết</span>
          <strong>{previewModelLabel}</strong>
        </div>
        {previewModels.length > 0 ? (
          modelPreviewReady ? (
            <Canvas
              key={selectedEventId}
              dpr={[1, 1.3]}
              camera={{
                position: [0, 1.22, 4.9],
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
            <div className="museum-viewer-loading">
              <button
                type="button"
                className="model-load-button"
                onClick={() => setLoadedModelEventId(selectedEventId)}
              >
                <Box aria-hidden="true" className="h-5 w-5" />
                Tải mô hình 3D
              </button>
            </div>
          )
        ) : (
          <div className="museum-viewer-loading">
            {event.missingModelDescription ??
              "Chưa có mô hình GLB tương ứng cho mốc lịch sử này."}
          </div>
        )}
      </div>

      <div className="archive-heading">
        <div>
          <p>Tư liệu ảnh bổ sung</p>
          <h2>{event.title}</h2>
        </div>
        {images.length > 0 && (
          <span>
            {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        )}
      </div>

      {activeImage && activeImageSrc ? (
        <>
          <figure className="archive-feature">
            <button
              type="button"
              className="archive-feature-image"
              aria-label={`Mở chi tiết ảnh: ${activeImage.caption}`}
              onClick={() =>
                setSelectedResource({ eventId: event.id, image: activeImage })
              }
            >
              <Image
                src={activeImageSrc}
                alt={activeImage.caption}
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
                onError={() => {
                  if (activeImage.src !== fallbackSrc) {
                    setFailedImages((current) => ({
                      ...current,
                      [activeImage.src]: true
                    }));
                  }
                }}
              />
              <span className="archive-expand">
                <Expand aria-hidden="true" className="h-5 w-5" />
                Xem chi tiết
              </span>
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Ảnh tư liệu trước"
                  className="archive-arrow archive-arrow-left"
                  onClick={showPreviousImage}
                >
                  <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  aria-label="Ảnh tư liệu sau"
                  className="archive-arrow archive-arrow-right"
                  onClick={showNextImage}
                >
                  <ChevronRight aria-hidden="true" className="h-6 w-6" />
                </button>
              </>
            )}

            <figcaption>
              <p>{activeImage.caption}</p>
              <span>{activeImage.sourceNote}</span>
            </figcaption>
          </figure>

          {images.length > 1 && (
            <div className="archive-thumbnails" aria-label="Danh sách ảnh tư liệu">
              {images.map((image, index) => {
                const src = failedImages[image.src] ? fallbackSrc : image.src;
                const active = index === activeImageIndex;

                return (
                  <button
                    key={image.src}
                    type="button"
                    aria-label={`Chọn ảnh ${index + 1}: ${image.caption}`}
                    aria-pressed={active}
                    className="archive-thumbnail"
                    onClick={() =>
                      setActiveImageSelection({
                        eventId: selectedEventId,
                        index
                      })
                    }
                  >
                    <span className="relative block aspect-video w-full">
                      <Image
                        src={src}
                        alt=""
                        fill
                        unoptimized
                        sizes="240px"
                        className="object-cover"
                        onError={() => {
                          if (image.src !== fallbackSrc) {
                            setFailedImages((current) => ({
                              ...current,
                              [image.src]: true
                            }));
                          }
                        }}
                      />
                    </span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="archive-empty">
          Chưa có tư liệu ảnh thật cho mốc lịch sử này.
        </div>
      )}

      {selectedImage && selectedImageSrc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="supplemental-image-title"
          className="resource-dialog-backdrop"
        >
          <button
            type="button"
            aria-label="Đóng chi tiết ảnh"
            className="absolute inset-0 cursor-default"
            onClick={() => setSelectedResource(null)}
          />
          <div className="resource-dialog">
            <div className="relative min-h-[320px] md:min-h-[620px]">
              <Image
                src={selectedImageSrc}
                alt={selectedImage.caption}
                fill
                unoptimized
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
            <aside>
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
                  className="resource-dialog-close"
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
