import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/v2/section";
import { team } from "@/content/v2/about";

/**
 * The photo, or until there is one, a cream panel with a head-and-shoulders outline. On a
 * phone an empty panel would be a large blank block, so it is left out there.
 */
function PortraitSlot({ src, alt, className }: { src?: string; alt: string; className: string }) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
  }
  return (
    <div aria-hidden className={`flex items-center justify-center bg-[#eeeae0] ${className} max-md:hidden`}>
      <svg viewBox="0 0 24 24" className="size-[30px]" fill="none" stroke="#b0a692" strokeWidth="1.4">
        <circle cx="12" cy="9" r="3.6" />
        <path d="M5 19.5c1.6-3.4 4-5.1 7-5.1s5.4 1.7 7 5.1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * Who you will deal with: Chamara in a wide card, then the rest of the team in a row of
 * four. Team members appear once they have a name and a portrait in the content file.
 */
export function Team() {
  const { lead } = team;
  const members = team.members.filter((m) => m.portrait);

  return (
    <Section
      id="team"
      surface="cream"
      className="py-[100px] max-lg:py-16 max-md:py-14"
      innerClassName="flex flex-col gap-[52px] max-md:gap-8"
    >
      <Reveal
        from="rise"
        className="flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-5"
      >
        <h2 className="m-0 max-w-[620px] font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]">
          {team.heading}
        </h2>
        <p className="m-0 w-[400px] shrink-0 text-[16px]/[25px] text-[#52687b] max-lg:w-full max-lg:max-w-[560px] max-md:text-[15px]/[24px]">
          {team.intro}
        </p>
      </Reveal>

      <Reveal
        from="rise"
        delay={100}
        className="flex items-stretch gap-12 bg-white p-10 max-lg:gap-8 max-md:flex-col max-md:gap-6 max-md:p-5"
      >
        <PortraitSlot
          src={lead.portrait}
          alt={`Portrait of ${lead.name}`}
          className="w-[320px] shrink-0 max-lg:w-[240px] max-md:aspect-[4/3] max-md:w-full"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-5 py-2 max-md:py-0">
          <div className="flex flex-col gap-[5px]">
            <h3 className="m-0 text-[28px]/[36px] font-semibold tracking-[-0.01em] text-v2-navy max-md:text-[24px]/[32px]">
              {lead.name}
            </h3>
            <p className="m-0 text-[15px]/[22px] text-[#65788c]">{lead.role}</p>
          </div>
          {lead.quote ? (
            <blockquote className="m-0 max-w-[620px] text-[18px]/[26px] text-v2-navy max-md:text-[16px]/[25px]">
              “{lead.quote}”
            </blockquote>
          ) : (
            <p className="m-0 max-w-[620px] text-[18px]/[26px] text-v2-navy max-md:text-[16px]/[25px]">
              {lead.story}
            </p>
          )}
          <div className="mt-auto flex items-center gap-[22px] pt-4 max-md:flex-col max-md:items-stretch max-md:gap-3 max-md:pt-2">
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-v2-navy px-[22px] py-[13px] text-[15px]/[20px] text-white transition-[opacity,scale] duration-150 ease-out-quad hover:opacity-90 active:scale-[0.97] motion-reduce:transition-none max-md:h-[52px]"
            >
              Talk to {lead.name} <span aria-hidden>↗</span>
            </Link>
            <a
              href="mailto:contact@travedise.com"
              className="text-[15px]/[20px] text-v2-navy hover:opacity-80 max-md:text-center"
            >
              contact@travedise.com
            </a>
          </div>
        </div>
      </Reveal>

      {members.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-4 gap-[30px] p-0 max-lg:grid-cols-2 max-md:gap-x-4 max-md:gap-y-6">
          {members.map((m) => (
            <li key={m.name} className="flex flex-col gap-4 max-md:gap-3">
              <PortraitSlot
                src={m.portrait}
                alt={`Portrait of ${m.name}`}
                className="h-[300px] w-full max-md:h-auto max-md:aspect-[4/5]"
              />
              <div className="flex flex-col gap-1">
                <h3 className="m-0 text-[18px]/[26px] font-semibold text-v2-navy max-md:text-[16px]/[22px]">
                  {m.name}
                </h3>
                <p className="m-0 text-[14px]/[21px] text-[#65788c] max-md:text-[13px]/[19px]">
                  {m.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
