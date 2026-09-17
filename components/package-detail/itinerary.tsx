import { AccordionItem } from "@/components/site/faq-accordion";
import type { ItineraryStop } from "@/content/package-details";
import { cn } from "@/lib/cn";

const ICONS = {
  days: "/assets/6a31d42da3afddf46f0953fa_calendar-03.svg",
  place: "/assets/6a31d49199f602fc31c3716f_location-01.svg",
  stay: "/assets/6a67938bc3656fb06d574ae4_Amenities-Icon.svg",
};

/** Same motion as the FAQ accordion ("FAQ Opens" / "FAQ Closes": 300ms linear). */
const MOTION = "duration-300 ease-linear motion-reduce:transition-none";

function IconLabel({ icon, children }: { icon: string; children: string }) {
  return (
    <span className="flex items-center justify-start gap-2.5">
      <img src={icon} alt="" className="block w-6 min-w-6" />
      {children}
    </span>
  );
}

/**
 * The day-by-day accordion (Webflow `.tour-details` / `.faq-list-wrap.gallery`). Each stop
 * opens to its description, hotel and photos.
 *
 * The CMS template styled its first item slightly differently (paragraph in Inter Tight,
 * smaller hotel name); that's kept so the pages look exactly as before.
 */
export function Itinerary({ stops }: { stops: ItineraryStop[] }) {
  return (
    <section aria-label="Itinerary">
      <div className="container-site">
        <div className="flex w-full flex-col items-start gap-6">
          {stops.map((stop, i) => (
            <ItineraryItem key={stop.days + stop.title} stop={stop} first={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ItineraryItem({ stop, first }: { stop: ItineraryStop; first: boolean }) {
  return (
    <AccordionItem
      reveal={{ from: "left" }}
      className="border-t border-black/12 bg-white py-8"
      headingAs="h6"
      headingClassName="font-sans text-base/6 font-normal text-slate"
      header={
        <span className="flex flex-col items-start justify-center gap-3">
          <span className="flex items-center justify-start gap-10">
            <IconLabel icon={ICONS.days}>{stop.days}</IconLabel>
            <IconLabel icon={ICONS.place}>{stop.place}</IconLabel>
          </span>
          <span className="block font-serif text-[28px]/[113%] font-light text-navy">
            {stop.title}
          </span>
        </span>
      }
    >
      {/* inline-size containment: the fixed 520px column must not widen the panel (it overflows
          and gets clipped on phones, as on the Webflow page). */}
      <div className="flex gap-6 [contain:inline-size] max-lg:flex-col">
        <div className="flex w-[520px] flex-col gap-3.5">
          <p
            className={cn(
              "m-0 -translate-y-5 pt-2 transition-[translate] group-data-open/accordion:translate-y-0",
              MOTION,
              first && "font-heading tracking-[0.4px]",
            )}
          >
            {stop.description}
          </p>
          {stop.stay && <IconLabel icon={ICONS.stay}>You’ll stay at</IconLabel>}
          {stop.stay !== undefined && (
            <div className="flex flex-col items-start justify-start gap-1">
              {stop.stay && (
                <>
                  <img
                    src={stop.stay.image.src}
                    srcSet={stop.stay.image.srcSet}
                    sizes={stop.stay.image.sizes}
                    alt=""
                    loading="lazy"
                    className="block h-[158px] w-[200px] rounded-xl object-cover"
                  />
                  <div className={cn(first && "text-sm/[143%]")}>{stop.stay.hotel}</div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <div className="w-[700px] overflow-clip max-lg:w-full">
            {stop.photos && <Photos place={stop.place} photos={stop.photos} />}
          </div>
        </div>
      </div>
    </AccordionItem>
  );
}

/** Webflow's one-slide slider holding a two-column CMS grid (it never moves). */
function Photos({
  place,
  photos,
}: {
  place: string;
  photos: NonNullable<ItineraryStop["photos"]>;
}) {
  return (
    <div className="max-md:mt-[30px] max-md:mb-[100px]">
      <div className="flex">
        <div>
          {photos.length ? (
            <ul role="list" className="m-0 -mx-2.5 flex list-none p-0 max-md:mx-0">
              {photos.map((image, i) => (
                <li key={image.src + i} className="relative min-h-px w-1/2 px-2.5 max-md:w-full">
                  <img
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes={image.sizes}
                    alt={`${place}, photo ${i + 1}`}
                    loading="lazy"
                    className="block h-[300px] w-full rounded-xl object-cover"
                  />
                </li>
              ))}
            </ul>
          ) : (
            // The CMS empty state, as the Webflow page shows it.
            <div className="bg-[#ddd] p-2.5">No items found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
