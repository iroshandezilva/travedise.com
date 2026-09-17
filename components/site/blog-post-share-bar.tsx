import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

import { SOCIALS, SocialIcon } from "./social-links";

/**
 * The "← Back to Blog" + social bar closing every blog post (Webflow `.back-details-block`),
 * right above the footer. Centered, max 608px, hairlines above and below.
 */
export function BlogPostShareBar({
  backHref = "/blog",
  backLabel = "Back to Blog",
  socials = ["Facebook"],
  className,
}: {
  backHref?: string;
  backLabel?: string;
  /** Names from SOCIALS to show on the right. The reference site only links Facebook. */
  socials?: string[];
  className?: string;
}) {
  return (
    <Reveal
      delay={100}
      className={cn(
        "mx-auto mt-[50px] flex w-full max-w-[608px] items-center justify-between border-y border-line py-5 max-md:mt-[30px]",
        className,
      )}
    >
      <Link
        href={backHref}
        className="flex items-center gap-1 text-navy no-underline transition-all duration-250 ease-[ease] hover:text-slate"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="block size-6 max-sm:size-5">
          <path
            d="M4.9992 12.0001C4.9972 12.0171 4.9982 11.9871 4.9992 12.0001V12.0001ZM18.4992 11.5001H6.0902C6.1642 11.2941 6.2852 11.1001 6.4522 10.9361L10.4002 6.89311C10.5932 6.69511 10.5892 6.37811 10.3912 6.18611C10.1942 5.99311 9.8782 5.99811 9.6842 6.19411L5.7432 10.2311C5.2642 10.7041 4.9992 11.3721 4.9992 12.0011C5.0062 12.6251 5.2462 13.2861 5.7152 13.7621L9.6382 17.8481C9.7362 17.9501 9.8672 18.0011 9.9992 18.0011C10.1242 18.0011 10.2492 17.9551 10.3452 17.8611C10.5442 17.6711 10.5512 17.3531 10.3602 17.1541L6.4322 13.0631C6.2702 12.8991 6.1532 12.7061 6.0832 12.5011H18.4992C18.7752 12.5011 18.9992 12.2771 18.9992 12.0011C18.9992 11.7251 18.7752 11.5011 18.4992 11.5011V11.5001Z"
            fill="currentColor"
          />
        </svg>
        <span>{backLabel}</span>
      </Link>
      <div className="flex items-center gap-2 max-md:gap-[5px]">
        {SOCIALS.filter((s) => socials.includes(s.name)).map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="flex size-10 min-w-10 items-center justify-center rounded-full bg-surface text-black transition-all duration-250 ease-[ease] max-md:size-[35px] max-md:min-w-[35px]"
          >
            <SocialIcon social={social} className="block size-4 min-w-4" />
          </a>
        ))}
      </div>
    </Reveal>
  );
}
