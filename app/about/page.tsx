import type { Metadata } from "next";

import { Offices } from "@/components/v2/about/offices";
import { Opening } from "@/components/v2/about/opening";
import { Principles } from "@/components/v2/about/principles";
import { Reviews } from "@/components/v2/about/reviews";
import { Team } from "@/components/v2/about/team";
import { FooterWide } from "@/components/v2/footer-wide";
import { ReadyBand } from "@/components/v2/home/ready-band";
import { HeroScrim, SiteNav } from "@/components/v2/site-nav";
import { aboutHero } from "@/content/v2/about";

const TITLE = "About us — Travedise";

export const metadata: Metadata = {
  title: TITLE,
  description: aboutHero.body,
  alternates: { canonical: "/about" },
  openGraph: {
    images: [aboutHero.image],
    title: TITLE,
    description: aboutHero.body,
    type: "website",
  },
  twitter: {
    images: [aboutHero.image],
    card: "summary_large_image",
    title: TITLE,
    description: aboutHero.body,
  },
};

/**
 * The About page, from the "About The team" design: why Travedise exists, who you will
 * deal with, how the team thinks, what travellers said, and where the two offices are.
 * Sections waiting on material from the team (portraits, reviews) stay out until it
 * arrives — see `content/v2/about.ts`.
 */
export default function AboutPage() {
  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <header className="relative h-[520px] w-full shrink-0 overflow-clip gutter-v2 max-md:h-[560px] max-md:px-0">
        <img
          src={aboutHero.image}
          alt={aboutHero.alt}
          className="absolute inset-0 block size-full object-cover object-[50%_58%]"
        />
        <HeroScrim desktop="linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.9) 0%, oklab(0 0 0 / 0) 74%), linear-gradient(180deg, oklab(0.2 -0.014 -0.012 / 0.52) 0%, oklab(0 0 0 / 0) 30%)" />
        <div className="relative mx-auto h-full w-full max-w-[1280px]">
          <SiteNav />
          <div className="absolute inset-x-0 bottom-[58px] flex max-w-[820px] flex-col gap-[18px] max-md:right-5 max-md:bottom-8 max-md:left-5 max-md:gap-3">
            <h1 className="m-0 font-display text-[60px]/[66px] font-medium tracking-[-0.01em] text-white max-lg:text-[52px]/[58px] max-md:text-[38px]/[44px]">
              {aboutHero.title}
            </h1>
            <p className="m-0 max-w-[660px] text-[19px]/[29px] text-[#e8eef1] max-md:text-[16px]/[25px]">
              {aboutHero.body}
            </p>
          </div>
        </div>
      </header>

      <main>
        <Opening />
        <Team />
        <Principles />
        <Reviews />
        <Offices />
        <ReadyBand />
      </main>

      <FooterWide
        statement="A small island with long days in it. Plan it once, properly, and it stays with you for years."
        statementFace="body"
      />
    </div>
  );
}
