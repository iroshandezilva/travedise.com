import Link from "next/link";

import { aboutStacks } from "@/content/home-v2";

/**
 * A statement about how we work, beside two overlapping photos of the team. The photos
 * lead on a phone and cross-fade through three frames each; desktop shows the first
 * frame of each stack, held still.
 */
export function AboutBand() {
  const [back, front] = aboutStacks;

  return (
    <section className="w-full shrink-0 overflow-clip bg-v2-cream py-[118px] gutter-v2 max-lg:py-16 max-md:py-14">
      <div className="container-v2 flex items-center justify-between gap-[88px] max-lg:flex-col max-lg:items-start max-lg:gap-12 max-md:gap-7">
        <div className="flex flex-col items-start gap-9 max-md:gap-7">
          <p className="m-0 w-[560px] font-soul text-[44px]/[56px] tracking-[-0.02em] text-v2-navy max-lg:w-full max-lg:text-[34px]/[44px] max-md:text-[28px]/[37px] max-md:tracking-[-0.01em]">
            We listen for what draws you to Sri Lanka, then make space for the people, places, and
            moments that matter to you.
            {/* The phone layout stops here — the line below needs the room. */}
            <span className="max-md:hidden">
              {" "}
              Get to know the team behind each thoughtful journey.
            </span>
          </p>
          <Link
            href="/about"
            className="flex h-[51px] w-[176px] items-center justify-between rounded-full border border-v2-navy bg-white px-5 max-md:h-[50px] max-md:w-[168px]"
          >
            <span className="text-[16px]/[20px] font-semibold text-v2-navy max-md:text-[15px]">
              About us
            </span>
            <span className="text-[18px]/[20px] font-semibold text-v2-navy max-md:text-[16px]">
              ↗
            </span>
          </Link>
        </div>

        <div className="relative h-[585px] w-[586px] shrink-0 max-lg:h-[440px] max-lg:w-full max-md:order-first max-md:h-[360px]">
          <div className="v2-fade-stack absolute top-0 left-0 h-[514px] w-[437px] max-lg:h-[360px] max-lg:w-[58%] max-md:h-[300px] max-md:w-[240px]">
            {back.map((frame) => (
              <img key={frame.src} src={frame.src} alt={frame.alt} loading="lazy" />
            ))}
          </div>
          <div className="v2-fade-stack offset absolute top-[93px] left-[124px] h-[492px] w-[462px] border-6 border-v2-cream shadow-[0_16px_36px_rgba(16,27,46,0.12)] max-lg:top-[80px] max-lg:left-[38%] max-lg:h-[360px] max-lg:w-[62%] max-md:top-[70px] max-md:left-auto max-md:right-0 max-md:h-[260px] max-md:w-[210px] max-md:border-5 max-md:shadow-[0_14px_30px_rgba(16,27,46,0.12)]">
            {front.map((frame) => (
              <img key={frame.src} src={frame.src} alt={frame.alt} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
