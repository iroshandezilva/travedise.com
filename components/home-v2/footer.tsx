import Link from "next/link";

import { SOCIALS } from "@/components/site/social-links";

import { LogoMark } from "./logo";

const PAGES = [
  { label: "Home", href: "/v2" },
  { label: "About", href: "/about" },
  { label: "Journeys", href: "/packages" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

/** The v2 footer: wordmark and a closing CTA on the left, link columns on the right. */
export function Footer() {
  return (
    <footer className="w-full min-h-[560px] shrink-0 bg-v2-navy py-[65px] gutter-v2 max-md:min-h-0 max-md:py-12">
      <div className="container-v2 flex h-full flex-col justify-between gap-16">
        <div className="flex items-start justify-between max-md:flex-col max-md:gap-10">
          <div className="flex w-[500px] shrink-0 flex-col items-start gap-6 max-lg:w-auto">
            <Link href="/v2" className="flex h-15 items-center gap-3">
              <LogoMark className="h-[41px] w-[58px]" />
              <span className="font-soul text-[39px]/[48px] font-medium text-white max-md:text-[30px]/[38px]">
                Travedise
              </span>
            </Link>
            <p className="m-0 font-soul text-[36px]/[42px] font-medium text-white max-md:text-[26px]/[32px]">
              Tell us what matters to you.
            </p>
            <Link
              href="/contact"
              className="mt-[7px] flex h-12 w-[185px] items-center gap-6 rounded-full bg-v2-sky px-5"
            >
              <span className="text-[16px]/[20px] font-semibold text-v2-navy">Plan your trip</span>
              <span className="text-[16px]/[20px] font-semibold text-v2-navy">↗</span>
            </Link>
          </div>

          <div className="flex gap-[75px] max-sm:gap-10">
            <nav aria-label="Footer" className="flex flex-col gap-[15px]">
              {PAGES.map((page) => (
                <Link key={page.href} href={page.href} className="text-[17px]/[1.2] text-white">
                  {page.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-[15px]">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[17px]/[1.2] text-white"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-7 max-sm:flex-col max-sm:gap-2.5">
          <p className="m-0 flex gap-[5px] text-[14px]/[1.2] text-[#c1c9d2]">
            <span>© Rights reserved by Travedise 2026</span>
            <span aria-hidden>·</span>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </p>
          <p className="m-0 text-[14px]/[1.2] text-[#c1c9d2]">
            Design and developed by Haux Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
