import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/v2/section";
import { reviews } from "@/content/v2/about";

/**
 * "What travellers said afterwards": three real reviews, word for word, with the overall
 * rating beside the heading. Renders nothing until `reviews.items` has something in it.
 */
export function Reviews() {
  if (reviews.items.length === 0) return null;
  const { rating } = reviews;

  return (
    <Section
      id="reviews"
      className="py-[100px] max-lg:py-16 max-md:py-14"
      innerClassName="flex flex-col gap-[46px] max-md:gap-8"
    >
      <Reveal
        from="rise"
        className="flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-5"
      >
        <h2 className="m-0 max-w-[620px] font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]">
          {reviews.heading}
        </h2>
        {rating && (
          <div className="flex w-[400px] shrink-0 flex-col items-start gap-3.5 max-lg:w-auto">
            <p className="m-0 flex items-baseline gap-3">
              <span className="text-[34px]/[42px] font-semibold tracking-[-0.01em] text-v2-navy">
                {rating.value}
              </span>
              <span className="text-[16px]/[24px] text-[#52687b]">
                from {rating.count} reviews on {rating.source}
              </span>
            </p>
            <a href={rating.href} className="text-[16px]/[1.2] text-v2-navy hover:opacity-80">
              Read all of them ↗
            </a>
          </div>
        )}
      </Reveal>

      <div className="grid grid-cols-3 items-stretch gap-[30px] max-lg:grid-cols-1 max-lg:gap-5">
        {reviews.items.map((r, i) => (
          <Reveal
            key={r.name + r.trip}
            as="figure"
            from="rise"
            delay={i * 60}
            className="m-0 flex flex-col gap-[18px] bg-v2-cream p-8 max-md:p-6"
          >
            <blockquote className="m-0 flex-1 text-[17px]/[28px] text-v2-navy max-md:text-[16px]/[26px]">
              {r.quote}
            </blockquote>
            <figcaption className="flex flex-col gap-[3px]">
              <span className="text-[15px]/[21px] text-v2-navy">{r.name}</span>
              <span className="text-[13px]/[19px] text-[#65788c]">
                {r.trip} · via {r.source}
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
