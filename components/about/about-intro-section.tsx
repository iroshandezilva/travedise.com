import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { aboutHighlights, aboutIntro } from "@/content/about";

import { AboutHighlights } from "./about-highlights";

/** Navy "About Travedise" section: founder story on the left, expanding highlight cards right. */
export function AboutIntroSection({
  intro = aboutIntro,
  highlights = aboutHighlights,
}: {
  intro?: typeof aboutIntro;
  highlights?: typeof aboutHighlights;
}) {
  return (
    <section className="bg-navy">
      <div className="container-site">
        <div className="grid grid-cols-[1fr_0.73fr] items-start gap-[100px] pt-[100px] pb-20 max-lg:flex max-lg:flex-col max-lg:gap-10 max-lg:pt-20 max-md:py-15">
          <div className="flex flex-col items-start justify-start max-lg:w-full">
            <Reveal from="left" delay={50}>
              <SectionTag tone="white">{intro.tag}</SectionTag>
            </Reveal>
            <Reveal
              as="h2"
              from="left"
              delay={100}
              className="mt-[25px] mb-[30px] font-boska text-white max-lg:mt-4 max-lg:mb-5"
            >
              {intro.title}
            </Reveal>
            <Reveal
              from="left"
              delay={150}
              className="mb-10 flex flex-col items-start justify-center gap-[15px] max-lg:mb-7.5 max-lg:gap-2.5"
            >
              {intro.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} className="m-0 text-body-lg/[155%] text-slate-300">
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal
              from="left"
              delay={200}
              className="flex items-center justify-start gap-[15px] max-sm:gap-2.5"
            >
              <img
                src={intro.author.image}
                loading="lazy"
                alt={intro.author.name}
                className="block w-[70px] rounded-2xl max-sm:w-[50px]"
              />
              <div className="flex flex-col items-start justify-center gap-px">
                <div className="text-h6 font-medium text-white">{intro.author.name}</div>
                <div className="text-slate-300">{intro.author.role}</div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200} className="flex w-full flex-col gap-2.5">
            <AboutHighlights items={highlights} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
