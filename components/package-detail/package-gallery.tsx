"use client";

import { useState } from "react";

import { Lightbox } from "@/components/package-detail/lightbox";
import { Reveal } from "@/components/ui/reveal";
import type { ResponsiveImage } from "@/content/package-details";

/**
 * The hero photo with its row of thumbnails (Webflow `.gallery-card`). The cover opens the
 * whole `gallery` in the lightbox; a thumbnail opens just its own photo, as on the Webflow page.
 */
export function PackageGallery({
  title,
  cover,
  gallery,
}: {
  title: string;
  cover: ResponsiveImage;
  gallery: ResponsiveImage[];
}) {
  const [open, setOpen] = useState<{ images: string[]; start: number } | null>(null);
  const all = gallery.map((g) => g.src);

  return (
    <Reveal from="left" delay={2}>
      <div className="relative">
        <div className="absolute bottom-0 left-0 z-80 flex w-full items-center gap-3 px-3 pb-3 xl:z-10">
          <ul role="list" className="m-0 flex list-none items-center gap-2.5 p-0">
            {gallery.map((image, i) => (
              <li key={image.src + i}>
                <button
                  type="button"
                  aria-label={`${title}: open photo ${i + 1} of ${gallery.length}`}
                  onClick={() => setOpen({ images: [image.src], start: 0 })}
                  className="flex h-[90px] w-full cursor-pointer items-center border-0 bg-transparent p-0"
                >
                  <img
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes={image.sizes}
                    alt=""
                    loading="lazy"
                    className="block h-full w-[200px] max-w-full rounded-lg object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          aria-label={`${title}: open the photo gallery`}
          onClick={() => setOpen({ images: all, start: 0 })}
          className="block w-full max-w-full cursor-pointer border-0 bg-transparent p-0"
        >
          <img
            src={cover.src}
            srcSet={cover.srcSet}
            sizes={cover.sizes}
            alt=""
            className="block h-[500px] w-full max-w-full rounded-[15px] object-cover"
          />
        </button>
      </div>
      {open && <Lightbox images={open.images} start={open.start} onClose={() => setOpen(null)} />}
    </Reveal>
  );
}
