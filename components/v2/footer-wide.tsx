import Link from "next/link";

import { SOCIALS } from "@/components/site/social-links";
import { cn } from "@/lib/cn";

const PACKAGE_STATEMENT =
  "Tell us what matters to you, and we will shape the days around it. The pace, the stops, the mornings worth getting up for, and the afternoons with nothing in them at all.";

/**
 * The wide v2 footer: a closing statement, a newsletter signup, four columns of links
 * and the legal row, over a gradient lit from both top corners and the bottom edge.
 *
 * Each page closes on its own statement. The home page sets it in the body face, as
 * its design does; the package pages set theirs in the display face.
 *
 * The signup has no backend yet — see the note on the form below.
 */
export function FooterWide({
  statement = PACKAGE_STATEMENT,
  statementFace = "display",
}: {
  statement?: string;
  statementFace?: "display" | "body";
} = {}) {
  return (
    <footer
      className="relative w-full min-h-[760px] shrink-0 bg-[#0c1526] pt-0 pb-10 gutter-v2 max-lg:min-h-0 max-md:pb-8"
      style={{
        backgroundImage:
          "radial-gradient(900px 480px at 8% 0%, rgba(71,205,255,0.22), rgba(0,0,0,0) 62%), radial-gradient(760px 460px at 92% 12%, rgba(196,175,140,0.2), rgba(0,0,0,0) 62%), radial-gradient(640px 400px at 54% 104%, rgba(201,106,69,0.22), rgba(0,0,0,0) 62%), linear-gradient(180deg, rgb(21,36,60) 0%, rgb(12,21,38) 58%)",
      }}
    >
      <div className="container-v2 flex h-full flex-col justify-between gap-16 max-md:gap-10">
        <div className="flex flex-col gap-14 pt-[76px] max-md:gap-8 max-md:pt-12">
          <p
            className={cn(
              "m-0 max-w-[940px] text-white max-lg:text-[28px]/[38px] max-md:text-[22px]/[32px]",
              statementFace === "display"
                ? "font-display text-[34px]/[46px] tracking-[-0.01em]"
                : "text-[34px]/[42px]",
            )}
          >
            {statement}
          </p>

          <div className="flex items-center justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-6">
            <div className="flex flex-col gap-2.5">
              <h2 className="m-0 font-display text-[30px]/[38px] font-normal text-white max-md:text-[24px]/[32px]">
                Sign up for news and updates
              </h2>
              <p className="m-0 max-w-[520px] text-[15px]/[23px] text-[#b8c8d1]">
                Field notes, route ideas and the months worth travelling in, once a month. No
                offers, no noise.
              </p>
            </div>
            {/* The site is a static export with no form handler, so this cannot submit
                anywhere yet. It is disabled rather than silently dropping an address. */}
            <form
              className="relative w-[460px] shrink-0 max-lg:w-full"
              aria-label="Newsletter signup"
            >
              <label htmlFor="v2-news" className="sr-only">
                Your email address
              </label>
              <input
                id="v2-news"
                type="email"
                disabled
                placeholder="Newsletter signup coming soon"
                className="h-16 w-full appearance-none rounded-full border border-white/34 bg-white/6 pr-[74px] pl-7 text-[16px] text-white placeholder:text-white/55 disabled:cursor-not-allowed max-md:h-14 max-md:pl-5 max-md:text-[15px]"
              />
              <button
                type="submit"
                disabled
                aria-label="Sign up"
                className="absolute top-[9px] right-[9px] flex size-[46px] items-center justify-center rounded-full border border-white/50 bg-none text-[16px] text-white disabled:cursor-not-allowed max-md:top-[7px] max-md:size-10"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-between gap-15 max-lg:flex-wrap max-lg:gap-10 max-md:gap-8">
          <FooterColumn title="Explore">
            <FooterLink href="/packages">Journeys</FooterLink>
            <FooterLink href="/#regions">Places</FooterLink>
            <FooterLink href="/blog">Travel notes</FooterLink>
            <FooterLink href="/about">About us</FooterLink>
          </FooterColumn>

          <FooterColumn title="Talk to us">
            <FooterLink href="/plan-your-trip">Plan your trip</FooterLink>
            <FooterLink href="mailto:contact@travedise.com">contact@travedise.com</FooterLink>
            <FooterLink href="tel:+61426965569">+61 426 965 569</FooterLink>
            <FooterLink href="tel:+94763972171">+94 76 397 2171</FooterLink>
          </FooterColumn>

          <FooterColumn title="Find us">
            <span className="w-[240px] text-[16px]/[24px] text-[#e2eaee]">
              Australia
              <br />
              5/22-30 Brighton St, Bundeena NSW 2230
            </span>
            <span className="w-[240px] text-[16px]/[24px] text-[#e2eaee]">
              Sri Lanka
              <br />
              212A Inland Hill Road, Karapitiya, Galle
            </span>
          </FooterColumn>

          <FooterColumn title="Follow">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px]/[22px] text-white hover:opacity-80"
              >
                {social.name}
              </a>
            ))}
          </FooterColumn>
        </div>

        <div className="flex items-center justify-between gap-10 pt-[26px] max-lg:flex-col max-lg:items-start max-lg:gap-5">
          <nav aria-label="Legal" className="flex flex-wrap gap-7 max-md:gap-x-5 max-md:gap-y-2.5">
            <FooterLink href="/privacy" muted>
              Privacy policy
            </FooterLink>
            <FooterLink href="/faq" muted>
              Questions
            </FooterLink>
            <FooterLink href="/plan-your-trip" muted>
              Contact us
            </FooterLink>
          </nav>
          <div className="flex gap-7 max-md:flex-col max-md:gap-1.5">
            <span className="text-[14px]/[20px] text-[#8a9eac]">© Travedise 2026</span>
            <span className="text-[14px]/[20px] text-[#8a9eac]">
              Design and developed by Haux Studio
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-[15px]/[20px] text-[#8a9eac]">{title}</span>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  muted = false,
  children,
}: {
  href: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  const className = muted
    ? "text-[14px]/[20px] text-[#c1c9d2] hover:text-white"
    : "text-[16px]/[22px] text-white hover:opacity-80";
  return href.startsWith("mailto:") || href.startsWith("tel:") ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
