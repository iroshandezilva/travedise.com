import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/v2/section";
import { principles } from "@/content/v2/about";

const TONES = { sky: "bg-v2-sky", sand: "bg-v2-sand", ember: "bg-v2-ember" } as const;

/** "How we think": four calls the team makes the same way every time, on navy. */
export function Principles() {
  return (
    <Section
      surface="navy"
      className="bg-[#0c1526] py-[100px] max-lg:py-16 max-md:py-14"
      innerClassName="flex flex-col gap-14 max-md:gap-9"
      style={{
        backgroundImage:
          "radial-gradient(900px 520px at 12% 0%, rgba(71,205,255,0.16), rgba(0,0,0,0) 60%), radial-gradient(700px 460px at 88% 90%, rgba(201,106,69,0.18), rgba(0,0,0,0) 62%)",
      }}
    >
      <Reveal
        from="rise"
        className="flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-5"
      >
        <h2 className="m-0 max-w-[660px] font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-white max-md:text-[30px]/[38px]">
          {principles.heading}
        </h2>
        <p className="m-0 w-[400px] shrink-0 text-[16px]/[25px] text-[#b8c8d1] max-lg:w-full max-lg:max-w-[560px] max-md:text-[15px]/[24px]">
          {principles.intro}
        </p>
      </Reveal>

      <div className="grid grid-cols-4 gap-10 max-lg:grid-cols-2 max-lg:gap-x-8 max-lg:gap-y-10 max-md:grid-cols-1 max-md:gap-8">
        {principles.items.map((item, i) => (
          <Reveal key={item.title} from="rise" delay={i * 60} className="flex flex-col gap-3.5">
            <span aria-hidden className={`h-[3px] w-[34px] ${TONES[item.tone]}`} />
            <h3 className="m-0 text-[20px]/[28px] font-semibold tracking-[-0.01em] text-white max-md:text-[18px]/[26px]">
              {item.title}
            </h3>
            <p className="m-0 text-[15px]/[24px] text-[#b8c8d1]">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
