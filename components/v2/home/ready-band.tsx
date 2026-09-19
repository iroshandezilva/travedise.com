import Link from "next/link";

import { readyBand } from "@/content/v2/home";

/**
 * Closing call to action over a full-bleed photo. The top of the photo fades into the
 * cream of the questions section above it; the text sits bottom right on desktop and
 * along the bottom on a phone, each over its own darkening wash.
 */
export function ReadyBand() {
  return (
    <section
      id="plan"
      className="relative h-[620px] w-full shrink-0 overflow-clip gutter-v2 max-md:h-[640px]"
    >
      <img
        src={readyBand.image}
        alt={readyBand.alt}
        loading="lazy"
        className="absolute inset-0 block size-full object-cover object-[36%_45%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 max-md:hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(247,245,239) 0%, rgba(247,245,239,0.82) 12%, rgba(247,245,239,0.35) 30%, rgba(247,245,239,0) 50%), linear-gradient(270deg, rgba(12,21,38,0.72) 0%, rgba(12,21,38,0.42) 42%, rgba(12,21,38,0) 70%), linear-gradient(0deg, rgba(12,21,38,0.5) 0%, rgba(12,21,38,0) 45%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden max-md:block"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(247,245,239) 0%, rgba(247,245,239,0) 22%), linear-gradient(0deg, rgba(12,21,38,0.86) 0%, rgba(12,21,38,0.55) 45%, rgba(12,21,38,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1280px] items-end justify-end max-md:justify-start">
        <div className="flex w-[560px] flex-col gap-[22px] pb-[72px] max-md:w-full max-md:gap-4 max-md:pb-10">
          <h2 className="m-0 font-display text-[56px]/[62px] font-normal tracking-[-0.01em] text-white max-md:text-[40px]/[46px]">
            Ready when
            <br />
            <em className="italic">you</em> are.
          </h2>
          <p className="m-0 max-w-[480px] text-[18px]/[28px] text-white/86 max-md:text-[16px]/[25px]">
            {readyBand.body}
          </p>
          <div className="flex items-center gap-[22px] pt-2.5 max-md:flex-col max-md:items-stretch max-md:gap-2.5 max-md:pt-2">
            <Link
              href="/contact"
              className="flex h-[60px] items-center gap-[18px] rounded-full bg-v2-sky pr-2 pl-7 transition-[opacity,scale] duration-150 ease-out-quad hover:opacity-90 active:scale-[0.97] motion-reduce:transition-none max-md:h-14 max-md:justify-between"
            >
              <span className="text-[16px]/[20px] font-semibold text-[#10212b]">
                Plan your trip
              </span>
              <span
                aria-hidden
                className="flex size-11 items-center justify-center rounded-full bg-v2-ember text-[16px] text-white max-md:size-10"
              >
                ↗
              </span>
            </Link>
            <Link
              href="/v2/packages"
              className="flex h-[60px] items-center justify-center rounded-full border border-white/55 px-6 text-[16px]/[20px] text-white backdrop-blur-[10px] transition-[background-color,scale] duration-150 ease-out-quad hover:bg-white/8 active:scale-[0.97] motion-reduce:transition-none max-md:h-14"
            >
              See the journeys
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
