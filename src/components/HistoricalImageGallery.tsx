"use client";

import Image from "next/image";
import { useState } from "react";

import type { TimelineImage } from "@/types/timeline";

type HistoricalImageGalleryProps = {
  images: TimelineImage[];
};

const fallbackSrc = "/historical-assets/placeholder.jpg";

export default function HistoricalImageGallery({
  images
}: HistoricalImageGalleryProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      {images.map((image) => {
        const shouldFallback = failedImages[image.src];
        const src = shouldFallback ? fallbackSrc : image.src;

        return (
          <figure
            key={`${image.src}-${image.caption}`}
            className="overflow-hidden border border-white/10 bg-black/20"
          >
            <Image
              src={src}
              alt={image.caption}
              width={1600}
              height={1000}
              loading="lazy"
              sizes="(min-width: 640px) 520px, 92vw"
              className="max-h-[460px] w-full bg-black/30 object-contain"
              onError={() => {
                if (image.src !== fallbackSrc) {
                  setFailedImages((current) => ({
                    ...current,
                    [image.src]: true
                  }));
                }
              }}
            />
            <figcaption className="space-y-2 border-t border-white/10 px-4 py-3">
              <p className="text-sm font-medium text-ivory">{image.caption}</p>
              <p className="text-xs leading-5 text-ivory/58">
                {image.sourceNote}
              </p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
