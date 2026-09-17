import { pointOfView } from "@/content/v2/home";
import { images } from "@/content/v2/images";
import { cn } from "@/lib/cn";

/** The compass rose watermarked into the corner of each stamp photo. */
function Compass({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      aria-hidden
      className={cn("absolute opacity-20 max-md:hidden", className)}
    >
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

/**
 * Our point of view, set beside two photos framed as postage stamps.
 *
 * A grid rather than two columns, because the stamps sit to the right of the whole
 * text block on desktop but slot between the opening paragraph and the list on a phone.
 */
export function FieldNote() {
  return (
    <section
      id="field-note"
      className="w-full shrink-0 overflow-clip bg-v2-cream py-25 gutter-v2 max-md:py-14"
    >
      <div className="container-v2 grid grid-cols-[610px_1fr] items-center gap-x-16 gap-y-[55px] max-lg:grid-cols-1 max-md:gap-y-7">
        <div className="col-start-1 row-start-1 flex flex-col gap-[25px] max-lg:col-start-1 max-md:gap-7">
          <h2 className="m-0 font-soul text-[57px]/[61px] font-normal tracking-[-0.02em] whitespace-pre-wrap text-v2-navy max-lg:text-[44px]/[50px] max-md:text-[34px]/[40px]">
            {"The places between\nthe places."}
          </h2>
          <p className="m-0 max-w-[520px] text-[18px]/[27px] text-[#485055] max-md:text-[16px]/[25px]">
            The route is more than a line on a map. It is the time you keep, the pauses you choose,
            and the freedom to change your mind.
          </p>
        </div>

        {/* Desktop: right of both text blocks. Phone: between them. */}
        <div className="relative col-start-2 row-span-2 row-start-1 h-[476px] max-lg:col-start-1 max-lg:row-span-1 max-lg:row-start-2 max-md:h-[430px]">
          <div className="absolute top-1/2 left-[117px] flex -translate-y-1/2 items-end max-lg:static max-lg:translate-y-0 max-lg:justify-center max-md:block">
            <figure className="v2-stamp m-0 h-[476px] w-[390px] shrink-0 rotate-[-5deg] max-md:absolute max-md:top-0 max-md:left-0 max-md:h-[320px] max-md:w-[250px] max-md:rotate-[-4deg] max-md:[--r:7px]">
              <div className="v2-stamp-face p-4 max-md:p-[11px]">
                <div className="relative">
                  <img
                    src={images.teaEstate}
                    alt="Tea hills at first light"
                    loading="lazy"
                    className="block h-[376px] w-[354px] object-cover max-md:h-[246px] max-md:w-[226px]"
                  />
                  <Compass className="top-3.5 right-3.5 size-[76px]" />
                </div>
                <figcaption className="flex h-16 items-center justify-center text-[13px]/[1.2] tracking-[0.08em] text-[#49555b] max-md:h-[50px] max-md:text-[11px]">
                  HILL COUNTRY, SRI LANKA · 06:42
                </figcaption>
              </div>
            </figure>
            <figure className="v2-stamp m-0 -ml-[103px] h-[334px] w-[267px] shrink-0 rotate-[7deg] [--r:7px] max-md:absolute max-md:top-40 max-md:right-0 max-md:ml-0 max-md:h-[240px] max-md:w-[190px] max-md:rotate-[6deg]">
              <div className="v2-stamp-face p-3 max-md:p-[9px]">
                <div className="relative">
                  <img
                    src={images.quietStop}
                    alt="A quiet stop along the route"
                    loading="lazy"
                    className="block h-[252px] w-[239px] object-cover max-md:h-[182px] max-md:w-[170px]"
                  />
                  <Compass className="top-2.5 right-2.5 size-[58px]" />
                </div>
                <figcaption className="flex h-[54px] items-center justify-center text-[12px]/[1.2] tracking-[0.08em] text-[#49555b] max-md:h-11 max-md:text-[10px]">
                  THE PAUSE IN BETWEEN
                </figcaption>
              </div>
            </figure>
          </div>
        </div>

        <div className="col-start-1 row-start-2 flex flex-col gap-[34px] max-lg:row-start-3 max-md:gap-7">
          {pointOfView.map((item) => (
            <div key={item.title} className="flex max-w-[520px] flex-col gap-2">
              <h3 className="m-0 font-soul text-[26px]/[32px] font-normal text-v2-navy max-md:text-[23px]/[29px]">
                {item.title}
              </h3>
              <p className="m-0 text-[16px]/[25px] text-v2-body max-md:text-[15px]/[24px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
