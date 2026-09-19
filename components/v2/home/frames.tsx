"use client";

import { useState } from "react";

import { frames } from "@/content/v2/home";

/**
 * "Frames from the road" — a captioned photo strip that scrolls on its own. It moves
 * for longer than five seconds, so it carries a pause button as well as holding still
 * under the cursor. The track holds the frames twice so the loop lands where it began;
 * the second copy is hidden from assistive tech.
 */
export function Frames() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="gallery"
      className="w-full shrink-0 overflow-clip bg-v2-navy py-[60px] max-md:py-14"
    >
      <div className="container-v2 mb-10 flex items-end justify-between gap-[60px] gutter-v2 max-lg:flex-col max-lg:items-start max-lg:gap-5 max-md:mb-[26px]">
        <h2 className="m-0 font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-white max-md:text-[30px]/[38px]">
          Frames from the road.
        </h2>
        <div className="flex shrink-0 items-end gap-[26px] max-lg:w-full max-lg:justify-between max-md:flex-col max-md:items-start max-md:gap-4">
          <p className="m-0 w-[320px] text-[16px]/[25px] text-[#b8c8d1] max-lg:w-auto max-lg:max-w-[520px] max-md:text-[15px]/[23px]">
            Ordered the way a day runs, from first light on the water to the lamps coming on in
            Kandy. Each frame says where it was taken and which journey goes there.
          </p>
          {/* With reduced motion the strip never moves, so there is nothing to pause. */}
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
            className="flex h-11 shrink-0 items-center gap-2.5 rounded-full border border-white/40 bg-transparent px-[18px] text-[14px] text-white transition-[background-color,scale] duration-150 ease-out-quad hover:bg-white/8 active:scale-[0.97] motion-reduce:hidden"
          >
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        {/* Only set when paused: an inline "running" would beat the hover rule. */}
        <div
          className="v2-gallery-track"
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {[false, true].map((copy) =>
            frames.map((frame) => (
              <figure
                key={`${frame.src}${copy ? "-copy" : ""}`}
                aria-hidden={copy || undefined}
                className="m-0 flex w-[400px] shrink-0 flex-col gap-3 max-md:w-[260px] max-md:gap-2.5"
              >
                <img
                  src={frame.src}
                  alt={copy ? "" : frame.alt}
                  loading="lazy"
                  className="block h-[300px] w-full object-cover max-md:h-[195px]"
                />
                <figcaption className="flex flex-col gap-[3px]">
                  <span className="text-[15px]/[21px] text-white max-md:text-[14px]/[20px]">
                    {frame.place}
                  </span>
                  <span className="text-[13px]/[19px] text-[#8a9eac]">On {frame.journey}</span>
                </figcaption>
              </figure>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
