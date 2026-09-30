import { SplitPillLink } from "@/components/v2/buttons";
import { closingCta } from "@/content/v2/shared";
import { images } from "@/content/v2/images";

/**
 * Closing call to action. On desktop the text sits over a photo that bleeds off the
 * bottom of the band; on a phone there is no room for that, so the photo drops below
 * the text as a band of its own.
 */
export function CtaBand() {
  return (
    <section
      id="plan"
      className="relative h-[600px] w-full shrink-0 overflow-clip gutter-v2 max-lg:h-auto max-lg:py-16 max-md:bg-v2-cream max-md:p-0"
    >
      {/* The photo is its own layer rather than a background on the section: an inline
          style would outrank any class trying to drop it at the phone breakpoint. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[112%_auto] bg-[-12px_bottom] bg-no-repeat max-lg:bg-cover max-md:hidden"
        style={{ backgroundImage: `url(${images.ctaBand})` }}
      />
      <div className="relative mx-auto h-full w-full max-w-[1280px] max-md:h-auto">
        <div className="absolute top-16 left-0 flex w-[625px] flex-col gap-6 max-lg:static max-lg:w-full max-md:px-5 max-md:pt-14">
          <h2 className="m-0 font-display text-[60px]/[66px] font-normal tracking-[-0.03em] whitespace-pre-wrap text-v2-navy max-lg:text-[44px]/[50px] max-md:text-[38px]/[44px] max-md:tracking-[-0.02em]">
            {"Let’s make the\njourney yours."}
          </h2>
        </div>
        <div className="absolute top-[78px] left-[731px] flex w-[420px] flex-col items-start gap-14 max-lg:static max-lg:mt-8 max-lg:w-full max-lg:max-w-[420px] max-lg:gap-8 max-md:mt-[22px] max-md:max-w-none max-md:gap-[22px] max-md:px-5 max-md:pb-10">
          <p className="m-0 text-[20px]/[28px] text-v2-navy max-md:text-[16px]/[25px] max-md:text-[#3a424a]">
            Tell us what you want to see, what you want to feel, and how you like to travel. We’ll
            shape the rest together.
          </p>
          <SplitPillLink
            href={closingCta.href}
            className="w-[192px] max-md:h-[54px] max-md:w-full max-md:rounded-[27px]"
          >
            {closingCta.action}
          </SplitPillLink>
        </div>
        {/* Phone only: the band's photo, which has nothing to sit behind here. */}
        <img
          src={images.ctaBand}
          alt=""
          loading="lazy"
          className="hidden h-[210px] w-full object-cover object-[50%_80%] max-md:block"
        />
      </div>
    </section>
  );
}
