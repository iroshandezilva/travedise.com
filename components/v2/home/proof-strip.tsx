import { Section } from "@/components/v2/section";
import { proofPoints } from "@/content/v2/home";

/** Four short reasons to travel with us, in a cream band under the hero. */
export function ProofStrip() {
  return (
    <Section
      surface="cream"
      className="py-[34px] max-md:py-8"
      innerClassName="grid grid-cols-4 items-center gap-10 max-lg:grid-cols-2 max-lg:gap-8 max-md:gap-x-5 max-md:gap-y-6"
    >
      <h2 className="sr-only">Why travel with us</h2>
      {proofPoints.map((point) => (
        <div key={point.title} className="flex flex-col gap-1.5">
          <h3 className="m-0 text-[16px]/[24px] font-semibold text-v2-navy max-md:text-[15px]/[22px]">
            {point.title}
          </h3>
          <p className="m-0 text-[14px]/[21px] text-[#65788c] max-md:text-[13px]/[20px]">
            {point.detail}
          </p>
        </div>
      ))}
    </Section>
  );
}
