import { PillLink } from "@/components/v2/buttons";
import { Section } from "@/components/v2/section";
import type { PackageV2 } from "@/content/v2/packages";

/** The dark bar under the hero: the journey's shape in three figures, and the CTA. */
export function PackageFacts({ facts }: { facts: PackageV2["facts"] }) {
  return (
    <Section
      surface="navy"
      className="py-10 max-md:py-8"
      innerClassName="flex items-center justify-between gap-12 max-lg:flex-col max-lg:items-start max-lg:gap-8"
    >
      <div className="flex gap-16 max-lg:gap-10 max-md:flex-col max-md:gap-6">
        {facts.map((fact) => (
          <div key={fact.value} className="flex flex-col gap-1.5">
            <span className="font-display text-[24px]/[30px] text-white max-md:text-[21px]/[27px]">
              {fact.value}
            </span>
            <span className="text-[14px]/[20px] text-[#b8c8d1]">{fact.detail}</span>
          </div>
        ))}
      </div>
      <PillLink href="/plan-your-trip" variant="sky" className="shrink-0 px-[26px] font-semibold">
        Start planning this journey ↗
      </PillLink>
    </Section>
  );
}
