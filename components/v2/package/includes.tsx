import { Section } from "@/components/v2/section";
import type { PackageV2 } from "@/content/v2/packages";

/** What is arranged before you land: a statement on the left, the four categories right. */
export function PackageIncludes({ includes }: { includes: PackageV2["includes"] }) {
  return (
    <Section
      className="py-24 max-md:py-14"
      innerClassName="flex items-start justify-between gap-24 max-lg:flex-col max-lg:gap-10"
    >
      <div className="flex w-[480px] shrink-0 flex-col gap-[22px] max-lg:w-full max-md:gap-4">
        <h2 className="m-0 font-display text-[44px]/[52px] font-normal tracking-[-0.01em] text-v2-navy max-md:text-[30px]/[38px]">
          {includes.heading}
        </h2>
        <p className="m-0 text-[17px]/[27px] text-[#42586a] max-md:text-[15px]/[24px]">
          {includes.body}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[26px] max-md:gap-5">
        {includes.items.map((item) => (
          <div key={item.title} className="flex flex-col gap-[7px]">
            <h3 className="m-0 font-display text-[22px]/[28px] font-normal text-v2-navy max-md:text-[20px]/[26px]">
              {item.title}
            </h3>
            <p className="m-0 text-[16px]/[25px] text-[#42586a] max-md:text-[15px]/[24px]">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
