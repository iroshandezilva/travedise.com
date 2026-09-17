import { Section } from "@/components/v2/section";
import { journeysIntro } from "@/content/v2/journeys";

/** How the routes are put together, with three figures that frame the whole set. */
export function JourneysIntro() {
  return (
    <Section
      className="py-[110px] max-md:py-14"
      innerClassName="flex items-start gap-25 max-lg:flex-col max-lg:gap-10"
    >
      <h2 className="m-0 w-[540px] shrink-0 font-soul text-[46px]/[55px] font-medium tracking-[-0.01em] text-v2-navy max-lg:w-full max-md:text-[30px]/[38px]">
        {journeysIntro.heading}
      </h2>
      <div className="flex min-w-0 flex-1 flex-col gap-10 max-md:gap-6">
        {journeysIntro.paragraphs.map((text) => (
          <p key={text} className="m-0 text-[18px]/[29px] text-[#344458] max-md:text-[15px]/[25px]">
            {text}
          </p>
        ))}
        <div className="flex gap-14 max-md:flex-col max-md:gap-6">
          {journeysIntro.facts.map((fact) => (
            <div key={fact.value} className="flex flex-col gap-1.5">
              <span className="font-soul text-[36px]/[44px] text-v2-navy max-md:text-[28px]/[36px]">
                {fact.value}
              </span>
              <span className="text-[15px]/[22px] text-[#65788c]">{fact.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
