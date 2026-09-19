import { Section } from "@/components/v2/section";
import { planningSteps } from "@/content/v2/home";

import { IntroText, SectionIntro } from "./section-intro";

/** "How the planning actually works" — four numbered steps on white cards. */
export function PlanningSteps() {
  return (
    <Section id="how" surface="cream" className="py-[90px] max-md:py-14">
      <SectionIntro
        heading="How the planning actually works."
        headingClassName="max-w-[620px]"
        className="mb-[42px] max-md:mb-7"
        aside={
          <IntroText>
            Four steps, no pressure at any of them. Nothing is held or charged until you say the
            plan is right.
          </IntroText>
        }
      />

      <ol className="m-0 grid list-none grid-cols-4 gap-[22px] p-0 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-3">
        {planningSteps.map((step, i) => (
          <li
            key={step.title}
            className="flex flex-col gap-3 bg-white px-7 pt-[30px] pb-8 max-md:px-6 max-md:pt-6 max-md:pb-7"
          >
            <span
              aria-hidden
              className="text-[24px]/[32px] font-semibold tracking-[-0.01em] text-v2-sand"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="m-0 text-[18px]/[26px] font-semibold text-v2-navy">{step.title}</h3>
            <p className="m-0 text-[15px]/[24px] text-[#52687b]">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
