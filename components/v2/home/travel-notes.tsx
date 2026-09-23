import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/v2/section";
import { travelNotes } from "@/content/v2/home";

import { SectionIntro } from "./section-intro";

/** Three travel notes, side by side. */
export function TravelNotes() {
  return (
    <Section id="notes" className="py-[90px] max-md:py-14">
      <SectionIntro
        heading="Useful reading for the way there."
        className="mb-10 max-md:mb-7"
        aside={
          <Link
            href="/blog"
            className="shrink-0 text-[16px]/[1.2] text-v2-navy hover:opacity-80 max-md:text-[15px]"
          >
            All travel notes ↗
          </Link>
        }
      />

      <Reveal
        from="rise"
        delay={90}
        className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-9"
      >
        {travelNotes.map((note) => (
          <Link key={note.title} href={note.href} className="group flex flex-col gap-3">
            <div className="mb-1.5 overflow-clip">
              <img
                src={note.image}
                alt={note.alt}
                loading="lazy"
                className="v2-card-img block h-[250px] w-full object-cover max-md:h-[220px]"
              />
            </div>
            <h3 className="m-0 text-[24px]/[32px] font-semibold tracking-[-0.01em] text-v2-navy max-md:text-[21px]/[28px]">
              {note.title}
            </h3>
            <p className="m-0 text-[15px]/[23px] text-[#52687b]">{note.body}</p>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}
