import Link from "next/link";

import { images, navLinks } from "@/content/home-v2";

import { LogoMark } from "./logo";
import { MobileMenu } from "./mobile-menu";

/**
 * Full-bleed video hero. On desktop the glass nav floats above a headline set a third
 * of the way down; on a phone the nav collapses into a single pill with a hamburger and
 * the headline sits at the bottom of the frame above two stacked buttons.
 */
export function Hero() {
  return (
    <header className="relative h-[900px] w-full shrink-0 overflow-clip gutter-v2 max-lg:h-[820px] max-md:h-[720px] max-md:px-0">
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
      {/* Desktop darkens from the left for the headline; the phone layout darkens from
          the bottom instead, because the headline sits down there. */}
      <div
        className="absolute inset-0 max-md:hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, oklab(0.2 -0.014 -0.012 / 0.64) 0%, oklab(0.2 -0.014 -0.012 / 0.22) 57%, oklab(0.2 -0.014 -0.012 / 0.1) 100%), linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.73) 0%, oklab(0 0 0 / 0) 52%)",
        }}
      />
      <div
        className="absolute inset-0 hidden max-md:block"
        style={{
          backgroundImage:
            "linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.82) 0%, oklab(0 0 0 / 0) 58%), linear-gradient(180deg, oklab(0.2 -0.014 -0.012 / 0.5) 0%, oklab(0 0 0 / 0) 34%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[190px] bg-[#09161d21] backdrop-blur-[22px] max-md:hidden"
        style={{
          maskImage: "linear-gradient(black 0%, rgba(0,0,0,0.75) 45%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto h-full w-full max-w-[1280px]">
        {/* One bar at both sizes: a full-width row on desktop, a glass pill on a phone. */}
        <div className="absolute inset-x-0 top-[22px] flex h-[70px] items-center justify-between max-md:top-3.5 max-md:right-4 max-md:left-4 max-md:h-15 max-md:rounded-full max-md:border max-md:border-white/22 max-md:bg-[#10253280] max-md:pr-2 max-md:pl-4 max-md:backdrop-blur-[16px]">
          <Link
            href="/v2"
            aria-label="Travedise home"
            className="flex h-11 w-[205px] shrink-0 items-center gap-2 max-lg:w-auto"
          >
            <LogoMark className="h-[30px] w-[43px] max-md:h-6 max-md:w-[34px]" />
            <span className="font-soul text-[28px]/[34px] font-medium text-white max-md:text-[21px]/[26px]">
              Travedise
            </span>
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
              className="rounded-[50px] border border-v2-sky bg-v2-sky px-[22px] py-[13px] text-[15px]/[1.2] font-medium text-[#10212b] max-md:hidden"
            >
              Plan your trip ↗
            </Link>
            <MobileMenu />
          </div>
        </div>

        <div className="absolute top-[392px] left-0 flex w-[900px] flex-col items-start gap-7 max-lg:top-auto max-lg:bottom-24 max-lg:w-full max-md:right-5 max-md:bottom-11 max-md:left-5 max-md:w-auto max-md:gap-5">
          <h1 className="m-0 font-soul text-[72px]/[76px] font-medium tracking-[-0.02em] whitespace-pre-wrap text-white max-lg:text-[56px]/[60px] max-md:text-[42px]/[46px]">
            {"See Sri Lanka.\nKeep time for\nwhat matters."}
          </h1>
          <p className="m-0 w-[520px] text-[20px]/[29px] text-[#e9eef1] max-lg:w-full max-lg:max-w-[520px] max-md:text-[16px]/[24px] max-md:text-[#e4ebef]">
            Tell us what you hope to see, and what you would rather not rush. We’ll shape a journey
            around the moments that matter.
          </p>
          <div className="flex items-center gap-7 max-md:w-full max-md:flex-col max-md:gap-2.5">
            <Link
              href="/contact"
              className="flex h-[52px] items-center justify-center rounded-[26px] bg-v2-sky px-7 text-[15px]/[1.2] font-medium text-[#10212b] max-md:w-full max-md:px-0 max-md:text-[16px]"
            >
              Plan your trip ↗
            </Link>
            <Link
              href="/packages"
              className="flex h-[52px] items-center text-[15px]/[1.2] text-white max-md:w-full max-md:justify-center max-md:rounded-[26px] max-md:border max-md:border-white/40 max-md:bg-white/12 max-md:text-[16px]"
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
