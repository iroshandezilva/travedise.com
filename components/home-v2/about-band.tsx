import Link from "next/link";

import { images } from "@/content/home-v2";

/** A statement about how we work, beside two overlapping photos of the team. */
export function AboutBand() {
  return (
    <section className="w-full shrink-0 overflow-clip bg-v2-cream py-[118px] gutter-v2 max-md:py-16">
      <div className="container-v2 flex items-center justify-between gap-[88px] max-lg:flex-col max-lg:items-start max-lg:gap-12">
        <div className="flex flex-col items-start gap-9">
          <p className="m-0 w-[560px] font-soul text-[44px]/[56px] tracking-[-0.02em] text-v2-navy max-lg:w-full max-lg:text-[34px]/[44px] max-md:text-[26px]/[36px]">
            We listen for what draws you to Sri Lanka, then make space for the people, places, and
            moments that matter to you. Get to know the team behind each thoughtful journey.
          </p>
          <Link
            href="/about"
            className="flex h-[51px] w-[176px] items-center justify-between rounded-full border border-v2-navy bg-white px-5"
          >
            <span className="text-[16px]/[20px] font-semibold text-v2-navy">About us</span>
            <span className="text-[18px]/[20px] font-semibold text-v2-navy">↗</span>
          </Link>
        </div>

        <div className="relative h-[585px] w-[586px] shrink-0 max-lg:h-[440px] max-lg:w-full max-md:h-[320px]">
          <img
            src={images.quietStop}
            alt=""
            loading="lazy"
            className="absolute top-0 left-0 block h-[514px] w-[437px] object-cover max-lg:h-[360px] max-lg:w-[58%] max-md:h-[260px]"
          />
          <img
            src={images.scenic}
            alt="The Travedise team"
            loading="lazy"
            className="absolute top-[93px] left-[124px] block h-[492px] w-[462px] border-6 border-v2-cream object-cover shadow-[0_16px_36px_rgba(16,27,46,0.12)] max-lg:top-[80px] max-lg:left-[38%] max-lg:h-[360px] max-lg:w-[62%] max-md:h-[260px]"
          />
        </div>
      </div>
    </section>
  );
}
