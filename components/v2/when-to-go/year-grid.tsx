import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/v2/section";
import { cn } from "@/lib/cn";
import { levelLabels, months, regions, yearAtAGlance, type Level } from "@/content/v2/when-to-go";

const cell: Record<Level, string> = {
  3: "bg-v2-navy",
  2: "bg-v2-sand",
  1: "bg-[#e9e6de]",
};

/**
 * Every region against every month, as a strip of coloured cells, then three notes on
 * what moves the calendar. On a phone each region's name sits above its strip, and the
 * month header drops to initials.
 */
export function YearGrid() {
  return (
    <Section className="py-[100px] max-md:py-14">
      <div className="mb-11 flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-5 max-md:mb-8">
        <h2 className="m-0 max-w-[760px] font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]">
          {yearAtAGlance.heading}
        </h2>
        <ul className="m-0 flex shrink-0 list-none flex-wrap gap-[22px] p-0 max-md:gap-x-4 max-md:gap-y-2">
          {([3, 2, 1] as const).map((level) => (
            <li key={level} className="flex items-center gap-2 text-[14px] text-[#52687b]">
              <span aria-hidden className={cn("size-3.5", cell[level])} />
              {levelLabels[level]}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1.5 max-md:gap-4">
        <div aria-hidden className="flex items-center gap-1.5">
          <div className="w-[260px] shrink-0 max-lg:w-[200px] max-md:hidden" />
          <div className="grid flex-1 grid-cols-12 gap-1.5 max-md:gap-[3px]">
            {months.map((m) => (
              <div key={m.name} className="text-center text-[13px]/[18px] text-[#65788c] max-md:text-[12px]">
                <span className="max-md:hidden">{m.name.slice(0, 3)}</span>
                <span className="hidden max-md:inline">{m.name[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {regions.map((region, r) => (
          <div
            key={region.name}
            className="flex items-center gap-1.5 max-md:flex-col max-md:items-stretch max-md:gap-2"
          >
            <div className="flex w-[260px] shrink-0 flex-col gap-0.5 pr-5 max-lg:w-[200px] max-md:w-full max-md:pr-0">
              <h3 className="m-0 font-heading text-[16px]/[24px] font-semibold text-v2-navy">
                {region.name}
              </h3>
              <div className="text-[13px]/[18px] text-[#65788c]">{region.note}</div>
            </div>
            <Reveal
              as="ul"
              from="fade"
              delay={r * 60}
              className="m-0 grid flex-1 list-none grid-cols-12 gap-1.5 p-0 max-md:gap-[3px]"
            >
              {months.map((m) => {
                const level = m.ratings[r];
                return (
                  <li
                    key={m.name}
                    title={`${m.name}: ${levelLabels[level]}`}
                    className={cn("h-11 max-md:h-8", cell[level])}
                  >
                    <span className="sr-only">
                      {m.name}: {levelLabels[level]}
                    </span>
                  </li>
                );
              })}
            </Reveal>
          </div>
        ))}
      </div>

      <div className="mt-[72px] grid grid-cols-3 gap-10 max-lg:grid-cols-1 max-lg:gap-4 max-md:mt-12">
        {yearAtAGlance.notes.map((note) => (
          <div key={note.title} className="flex flex-col gap-3 bg-v2-cream p-[30px] max-md:p-6">
            <h3 className="m-0 font-heading text-[20px]/[28px] font-semibold tracking-[-0.01em] text-v2-navy">
              {note.title}
            </h3>
            <p className="m-0 text-[15px]/[24px] text-[#344458]">{note.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
