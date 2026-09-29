import { Reveal } from "@/components/ui/reveal";

import { FooterLink } from "./footer-link";
import { SOCIALS, SocialIcon } from "./social-links";

const PAGES = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Plan your trip", href: "/plan-your-trip" },
  { label: "FAQ", href: "/faq" },
];

const LOGO = "/assets/69e71a6f589fe83624cd3faf_travedise-logo.svg";

/**
 * The site footer (Webflow `section.footer`) — identical on every page. The link to the
 * current route is highlighted automatically; pass `currentPath` only to force it.
 */
export function Footer({ currentPath }: { currentPath?: string }) {
  const muted = "text-slate-300 no-underline transition-all duration-250 ease-[ease]";
  return (
    <footer className="mx-2.5 mt-2.5 rounded-panel bg-navy max-sm:rounded-2xl">
      <div className="container-site">
        <div className="flex flex-col justify-center gap-[180px] pt-20 pb-[60px] max-lg:gap-[60px] max-lg:pt-[60px] max-md:gap-10 max-sm:pt-10">
          <div className="flex items-start justify-between max-lg:gap-10 max-md:gap-7 max-sm:flex-col">
            <Reveal
              delay={50}
              className="flex w-full max-w-[240px] flex-col items-start gap-[70px] max-lg:max-w-none max-lg:flex-row max-lg:justify-between max-lg:gap-[30px] max-sm:flex-col max-sm:gap-5"
            >
              <div className="flex flex-col items-start gap-4 max-lg:w-[300px] max-sm:w-auto max-sm:items-center max-sm:gap-2.5">
                <FooterLink href="/" currentPath={currentPath} className="block w-[105px]">
                  <img src={LOGO} loading="lazy" alt="Travedise" />
                </FooterLink>
                <p className="m-0 text-slate-300 max-sm:text-center">
                  Explore the world with confidence, comfort &amp; crafted experiences.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col items-end gap-[23px] max-lg:w-full max-lg:pt-[50px] max-md:gap-[60px] max-sm:items-center max-sm:gap-x-10 max-sm:gap-y-[30px]">
              <Reveal
                as="nav"
                aria-label="Footer"
                delay={100}
                className="flex flex-col gap-4 max-sm:gap-2.5"
              >
                <div className="flex items-start gap-2.5 max-sm:flex-col max-sm:items-center">
                  {PAGES.map((page) => (
                    <FooterLink
                      key={page.href}
                      href={page.href}
                      currentPath={currentPath}
                      className={`block hover:text-white ${muted}`}
                      currentClassName="text-white"
                    >
                      {page.label}
                    </FooterLink>
                  ))}
                </div>
              </Reveal>

              <div className="flex items-start gap-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 hover:text-white ${muted}`}
                  >
                    <span className="flex size-10 min-w-10 items-center justify-center rounded-full bg-navy-800 text-white">
                      <SocialIcon social={social} className="block size-4 max-md:size-3.5" />
                    </span>
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between max-md:flex-col max-md:gap-2.5">
            {[
              ["© Rights reserved by", "Travedise 2026"],
              ["Design and developed by", "Haux Studio"],
            ].map(([label, name]) => (
              <p
                key={label}
                className="m-0 flex items-center gap-[5px] text-slate-300 max-sm:flex-wrap max-sm:justify-center max-sm:text-sm/5"
              >
                <span>{label}</span>
                <span className="text-white">{name}</span>
                {label.startsWith("©") && (
                  <>
                    <span aria-hidden>·</span>
                    <FooterLink
                      href="/privacy"
                      currentPath={currentPath}
                      className={`hover:text-white ${muted}`}
                      currentClassName="text-white"
                    >
                      Privacy Policy
                    </FooterLink>
                  </>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
