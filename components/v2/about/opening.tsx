import type { CSSProperties } from "react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/v2/section";
import { opening, stamps } from "@/content/v2/about";

/**
 * Where each stamp sits in the 520×560 cluster, as percentages so the whole cluster can
 * shrink on a phone. Order matches `stamps`: the large one at the back, then top right,
 * then the one overlapping both at the bottom.
 */
const STAMP_PLACES = [
  { left: "1.54%", top: "3.93%", width: "57.7%", height: "66.43%", zIndex: 1, "--tilt": "-3.2deg" },
  { left: "61.92%", top: "4.29%", width: "35.77%", height: "41.43%", zIndex: 2, "--tilt": "2.4deg" },
  { left: "51.54%", top: "43.93%", width: "43.85%", height: "51.07%", zIndex: 3, "--tilt": "4.6deg" },
] as (CSSProperties & { "--tilt": string })[];

/** Why Travedise exists, with the few numbers behind it, beside a cluster of stamps. */
export function Opening() {
  return (
    <Section
      className="py-[100px] max-lg:py-16 max-md:py-14"
      innerClassName="flex items-start gap-24 max-xl:gap-16 max-lg:flex-col max-lg:gap-12 max-md:gap-10"
    >
      <Reveal from="rise" className="flex min-w-0 flex-1 flex-col gap-[30px] max-md:gap-5">
        <h2 className="m-0 font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]">
          {opening.heading}
        </h2>
        {opening.paragraphs.map((p) => (
          <p key={p} className="m-0 text-[18px]/[29px] text-[#344458] max-md:text-[16px]/[26px]">
            {p}
          </p>
        ))}
        <dl className="m-0 flex gap-14 pt-2.5 max-md:gap-8">
          {opening.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1.5">
              <dt className="text-[15px]/[22px] text-[#65788c] max-md:text-[14px]/[20px]">
                {s.label}
              </dt>
              <dd className="m-0 text-[34px]/[42px] font-semibold tracking-[-0.01em] text-v2-navy max-md:text-[28px]/[36px]">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal
        from="rise"
        delay={100}
        className="v2-stamps relative aspect-[520/560] w-[520px] shrink-0 max-lg:mx-auto max-lg:w-full max-lg:max-w-[520px]"
      >
        {stamps.map((stamp, i) => (
          <figure key={stamp.src} className="v2-stamp" style={STAMP_PLACES[i]}>
            <div className="v2-stamp-face">
              <img src={stamp.src} alt={stamp.alt} loading="lazy" />
            </div>
            <figcaption>{stamp.caption}</figcaption>
          </figure>
        ))}
        <div
          aria-hidden
          className="absolute top-[77.86%] left-[6.92%] z-[4] flex size-[86px] -rotate-[14deg] items-center justify-center rounded-full border-[1.5px] border-v2-navy/30 text-center text-[9px]/[12px] tracking-[0.14em] text-v2-navy/50 uppercase max-md:size-16 max-md:text-[7px]/[10px]"
        >
          Travedise
          <br />
          Galle
        </div>
      </Reveal>
    </Section>
  );
}
