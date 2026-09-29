import type { Metadata } from "next";

import { FooterWide } from "@/components/v2/footer-wide";
import { PlanSteps } from "@/components/v2/plan/plan-steps";
import { HeroScrim, SiteNav } from "@/components/v2/site-nav";
import { planHelp, planHero } from "@/content/v2/plan";

const TITLE = "Plan your trip — Travedise";

export const metadata: Metadata = {
  title: TITLE,
  description: planHero.body,
  alternates: { canonical: "/plan-your-trip" },
  openGraph: {
    images: [planHero.image],
    title: TITLE,
    description: planHero.body,
    type: "website",
  },
  twitter: {
    images: [planHero.image],
    card: "summary_large_image",
    title: TITLE,
    description: planHero.body,
  },
};

/**
 * The trip-planning page, which replaced the old contact page: a short hero, a two-step
 * enquiry form, and the ways to reach a person beside it.
 */
export default function PlanYourTripPage() {
  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <header className="relative h-[620px] w-full shrink-0 overflow-clip gutter-v2 max-md:h-[560px] max-md:px-0">
        <img
          src={planHero.image}
          alt={planHero.alt}
          className="absolute inset-0 block size-full object-cover"
        />
        <HeroScrim desktop="linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.86) 0%, oklab(0 0 0 / 0) 62%), linear-gradient(180deg, oklab(0.2 -0.014 -0.012 / 0.52) 0%, oklab(0 0 0 / 0) 30%)" />
        <div className="relative mx-auto h-full w-full max-w-[1280px]">
          <SiteNav />
          <div className="absolute inset-x-0 bottom-[58px] flex max-w-[820px] flex-col gap-[18px] max-md:right-5 max-md:bottom-8 max-md:left-5 max-md:gap-3">
            <h1 className="m-0 font-display text-[60px]/[66px] font-medium tracking-[-0.01em] text-white max-lg:text-[52px]/[58px] max-md:text-[38px]/[44px]">
              {planHero.title}
            </h1>
            <p className="m-0 max-w-[620px] text-[19px]/[29px] text-[#e8eef1] max-md:text-[16px]/[25px]">
              {planHero.body}
            </p>
          </div>
        </div>
      </header>

      <main>
        <PlanSteps aside={<HelpPanel />} />
      </main>

      <FooterWide statementFace="body" />
    </div>
  );
}

function HelpPanel() {
  return (
    <aside className="flex w-[400px] shrink-0 flex-col gap-[22px] max-xl:w-[340px] max-lg:w-full">
      <div
        className="flex flex-col gap-[26px] bg-v2-navy px-9 py-10 max-md:px-5 max-md:py-8"
        style={{
          backgroundImage:
            "radial-gradient(420px 300px at 15% 0%, rgba(71,205,255,0.24), rgba(0,0,0,0) 66%), radial-gradient(380px 280px at 95% 30%, rgba(196,175,140,0.2), rgba(0,0,0,0) 66%)",
        }}
      >
        <h2 className="m-0 font-display text-[28px]/[36px] font-normal tracking-[-0.005em] text-white max-md:text-[24px]/[32px]">
          {planHelp.heading}
        </h2>
        <p className="m-0 text-[15px]/[24px] text-v2-muted">{planHelp.body}</p>
        <div className="flex flex-col gap-4">
          {planHelp.contacts.map((c) => (
            <a key={c.href} href={c.href} className="flex flex-col gap-[3px] hover:opacity-80">
              <span className="text-[13px]/[18px] text-[#8a9eac]">{c.label}</span>
              <span className="text-[18px]/[26px] font-semibold text-white">{c.value}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[18px] bg-v2-cream p-9 max-md:px-5 max-md:py-8">
        <h3 className="m-0 text-[20px]/[28px] font-semibold tracking-[-0.01em] text-v2-navy">
          {planHelp.next.heading}
        </h3>
        <div className="flex flex-col gap-3.5">
          {planHelp.next.steps.map((s) => (
            <p key={s} className="m-0 text-[15px]/[23px] text-[#42586a]">
              {s}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-v2-cream p-9 max-md:px-5 max-md:py-8">
        <h3 className="m-0 text-[20px]/[28px] font-semibold tracking-[-0.01em] text-v2-navy">
          Find us
        </h3>
        {planHelp.offices.map((o) => (
          <p key={o.place} className="m-0 text-[15px]/[23px] text-[#42586a]">
            {o.place}
            <br />
            {o.address}
          </p>
        ))}
      </div>
    </aside>
  );
}
