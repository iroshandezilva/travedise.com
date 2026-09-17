import Link from "next/link";

import { images } from "@/content/home-v2";

/** Closing call to action, set over a photo that bleeds off the bottom of the band. */
export function CtaBand() {
  return (
    <section
      id="plan"
      className="h-[600px] w-full shrink-0 overflow-clip bg-[112%_auto] bg-[-12px_bottom] bg-no-repeat gutter-v2 max-lg:h-auto max-lg:bg-cover max-lg:py-16"
      style={{ backgroundImage: `url(${images.ctaBand})` }}
    >
      <div className="relative mx-auto h-full w-full max-w-[1280px]">
        <div className="absolute top-16 left-0 flex w-[625px] flex-col gap-6 max-lg:static max-lg:w-full">
          <h2 className="m-0 font-soul text-[60px]/[66px] font-normal tracking-[-0.03em] whitespace-pre-wrap text-v2-navy max-lg:text-[44px]/[50px] max-md:text-[32px]/[38px]">
            {"Let’s make the\njourney yours."}
          </h2>
        </div>
        <div className="absolute top-[78px] left-[731px] flex w-[420px] flex-col items-start gap-14 max-lg:static max-lg:mt-8 max-lg:w-full max-lg:max-w-[420px] max-lg:gap-8">
          <p className="m-0 text-[20px]/[28px] text-v2-navy max-md:text-[17px]/[25px]">
            Tell us what you want to see, what you want to feel, and how you like to travel. We’ll
            shape the rest together.
          </p>
          <Link
            href="/contact"
            className="flex h-[52px] w-[192px] items-center justify-between rounded-full bg-v2-sky pr-5 pl-[22px]"
          >
            <span className="text-[16px]/[20px] font-semibold text-v2-navy">Plan your trip</span>
            <span className="text-[18px]/[20px] font-medium text-v2-navy">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
