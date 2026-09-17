import { galleryImages } from "@/content/home-v2";

/**
 * A photo strip that scrolls endlessly. The track holds the images twice — the second
 * copy is decorative — so the -50% loop lands exactly where it started.
 */
export function Gallery() {
  return (
    <section
      id="gallery"
      className="w-full shrink-0 overflow-clip bg-v2-navy py-[90px] max-md:py-16"
    >
      <div className="container-v2 mb-[42px] flex items-end justify-between gutter-v2 max-lg:flex-col max-lg:items-start max-lg:gap-5">
        <h2 className="m-0 font-soul text-[46px]/[54px] font-medium text-white max-md:text-[32px]/[40px]">
          Places we keep going back to.
        </h2>
        <p className="m-0 w-[330px] shrink-0 text-[16px]/[25px] text-v2-muted max-lg:w-full max-lg:max-w-[430px]">
          A few frames from recent journeys. Hover to hold the strip still.
        </p>
      </div>
      <div className="w-full overflow-hidden">
        <div className="v2-gallery-track">
          {galleryImages.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="block h-[520px] w-[420px] shrink-0 object-cover max-md:h-[360px] max-md:w-[290px]"
            />
          ))}
          {galleryImages.map((image) => (
            <img
              key={`${image.src}-copy`}
              src={image.src}
              alt=""
              aria-hidden
              loading="lazy"
              className="block h-[520px] w-[420px] shrink-0 object-cover max-md:h-[360px] max-md:w-[290px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
