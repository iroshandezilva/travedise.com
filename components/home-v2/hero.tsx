import Link from "next/link";

import { images, navLinks } from "@/content/home-v2";

import { LogoMark } from "./logo";

/**
 * Full-bleed video hero with the glass nav floating over it. Two gradient washes darken
 * the left edge and the base so the headline holds, and a blurred strip sits under the nav.
 */
export function Hero() {
  return (
    <header className="relative h-[900px] w-full shrink-0 overflow-clip gutter-v2 max-lg:h-auto max-lg:pt-28 max-lg:pb-24">
      <video
        src={images.heroVideo}
        poster={images.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        aria-label="Sri Lankan landscapes in motion"
        className="absolute inset-0 block size-full object-cover"
      />
      {/* Left-to-right wash for the headline, plus a lift from the bottom edge. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, oklab(0.2 -0.014 -0.012 / 0.64) 0%, oklab(0.2 -0.014 -0.012 / 0.22) 57%, oklab(0.2 -0.014 -0.012 / 0.1) 100%), linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.73) 0%, oklab(0 0 0 / 0) 52%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[190px] bg-[#09161d21] backdrop-blur-[22px]"
        style={{
          maskImage: "linear-gradient(black 0%, rgba(0,0,0,0.75) 45%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto h-full w-full max-w-[1280px]">
        <div className="absolute inset-x-0 top-[22px] flex h-[70px] items-center justify-between max-lg:static max-lg:h-auto">
          <Link
            href="/v2"
            aria-label="Travedise home"
            className="flex h-11 w-[205px] shrink-0 items-center gap-2 max-lg:w-auto"
          >
            <LogoMark className="h-[30px] w-[43px]" />
            <span className="font-soul text-[28px]/[34px] font-medium text-white">Travedise</span>
          </Link>

          <nav
            aria-label="Main"
            className="flex h-14 items-center gap-[26px] rounded-full border border-white/29 bg-[#102532a8] px-[26px] backdrop-blur-[18px] max-lg:hidden"
          >
            {navLinks.map(({ href, label }) => (
              <Link key={label} href={href} className="text-[15px]/[1.2] text-white">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex w-[205px] shrink-0 items-center justify-end max-lg:w-auto">
            <Link
              href="/contact"
              className="rounded-[50px] border border-v2-sky bg-v2-sky px-[22px] py-[13px] text-[15px]/[1.2] font-medium text-[#10212b]"
            >
              Plan your trip ↗
            </Link>
          </div>
        </div>

        <div className="absolute top-[392px] left-0 flex w-[900px] flex-col items-start gap-7 max-lg:static max-lg:mt-20 max-lg:w-full">
          <h1 className="m-0 font-soul text-[72px]/[76px] font-medium tracking-[-0.02em] whitespace-pre-wrap text-white max-lg:text-[56px]/[60px] max-md:text-[40px]/[46px]">
            {"See Sri Lanka.\nKeep time for\nwhat matters."}
          </h1>
          <p className="m-0 w-[520px] text-[20px]/[29px] text-[#e9eef1] max-lg:w-full max-lg:max-w-[520px] max-md:text-[17px]/[26px]">
            Tell us what you hope to see, and what you would rather not rush. We’ll shape a journey
            around the moments that matter.
          </p>
          <div className="flex items-center gap-7 max-sm:gap-5">
            <Link
              href="/contact"
              className="flex h-[52px] items-center justify-center rounded-[26px] bg-v2-sky px-7 text-[15px]/[1.2] font-medium text-[#10212b]"
            >
              Plan your trip ↗
            </Link>
            <Link
              href="/packages"
              className="flex h-[52px] items-center text-[15px]/[1.2] text-white"
            >
              Browse journeys ↗
            </Link>
          </div>
        </div>

        <a
          href="#field-note"
          className="absolute top-[738px] right-0 flex items-center gap-3.5 max-lg:hidden"
        >
          <span className="flex size-[46px] shrink-0 items-center justify-center rounded-full border border-white/75 text-[23px]/[1.2] text-white">
            ↓
          </span>
          <span className="text-[14px]/[1.2] whitespace-pre text-white">Scroll to discover</span>
        </a>
      </div>
    </header>
  );
}
