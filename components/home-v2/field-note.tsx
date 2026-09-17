import { images, pointOfView } from "@/content/home-v2";
import { cn } from "@/lib/cn";

/** The compass rose watermarked into the corner of each stamp photo. */
function Compass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden className={cn("absolute opacity-20", className)}>
      <circle cx="48" cy="48" r="45" fill="none" stroke="#fff" strokeWidth="2" />
      <circle
        cx="48"
        cy="48"
        r="36"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeDasharray="5 6"
      />
      <path d="M12 44 H84 M12 52 H84" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

/** Our point of view, set beside two photos framed as postage stamps. */
export function FieldNote() {
  return (
    <section
      id="field-note"
      className="w-full shrink-0 overflow-clip bg-v2-cream py-25 gutter-v2 max-md:py-16"
    >
      <div className="container-v2 flex max-lg:flex-col max-lg:gap-16">
        <div className="flex flex-col items-start gap-[55px]">
          <div className="flex w-[610px] flex-col gap-[25px] max-lg:w-full">
            <h2 className="m-0 font-soul text-[57px]/[61px] font-normal tracking-[-0.02em] whitespace-pre-wrap text-v2-navy max-lg:text-[44px]/[50px] max-md:text-[34px]/[40px]">
              {"The places between\nthe places."}
            </h2>
            <p className="m-0 max-w-[520px] text-[18px]/[27px] text-[#485055]">
              The route is more than a line on a map. It is the time you keep, the pauses you
              choose, and the freedom to change your mind.
            </p>
          </div>
          <div className="flex flex-col gap-[34px]">
            {pointOfView.map((item) => (
              <div key={item.title} className="flex max-w-[520px] flex-col gap-2">
                <h3 className="m-0 font-soul text-[26px]/[32px] font-normal text-v2-navy">
                  {item.title}
                </h3>
                <p className="m-0 text-[16px]/[25px] text-v2-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Two overlapping stamps, tilted against each other. */}
        <div className="relative h-[476px] flex-1 max-lg:h-auto">
          {/* The pair is ~554px wide, so it scales down rather than reflows on small screens. */}
          <div className="absolute top-1/2 left-[117px] flex -translate-y-1/2 items-end max-lg:static max-lg:translate-y-0 max-lg:justify-center max-md:origin-top max-md:scale-[0.72] max-sm:scale-[0.55]">
            <figure className="v2-stamp m-0 h-[476px] w-[390px] shrink-0 rotate-[-5deg]">
              <div className="v2-stamp-face p-4">
                <div className="relative">
                  <img
                    src={images.teaEstate}
                    alt="Tea hills at first light"
                    loading="lazy"
                    className="block h-[376px] w-[354px] object-cover"
                  />
                  <Compass className="top-3.5 right-3.5 size-[76px]" />
                </div>
                <figcaption className="flex h-16 items-center justify-center text-[13px]/[1.2] tracking-[0.08em] text-[#49555b]">
                  HILL COUNTRY, SRI LANKA · 06:42
                </figcaption>
              </div>
            </figure>
            <figure
              className="v2-stamp m-0 -ml-[103px] h-[334px] w-[267px] shrink-0 rotate-[7deg]"
              style={{ "--r": "7px" } as React.CSSProperties}
            >
              <div className="v2-stamp-face p-3">
                <div className="relative">
                  <img
                    src={images.quietStop}
                    alt="A quiet stop along the route"
                    loading="lazy"
                    className="block h-[252px] w-[239px] object-cover"
                  />
                  <Compass className="top-2.5 right-2.5 size-[58px]" />
                </div>
                <figcaption className="flex h-[54px] items-center justify-center text-[12px]/[1.2] tracking-[0.08em] text-[#49555b]">
                  THE PAUSE IN BETWEEN
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
