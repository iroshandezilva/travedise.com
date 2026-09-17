import Link from "next/link";

import { PackageGallery } from "@/components/package-detail/package-gallery";
import { Reveal } from "@/components/ui/reveal";
import type { PackageDetail } from "@/content/package-details";

/** Every package lists the same four inclusions (spelling as on the site). */
const INCLUSIONS = [
  { icon: "/assets/6a67938bc3656fb06d574ae4_Amenities-Icon.svg", label: "Accomodation" },
  { icon: "/assets/6a67938b9d12f58d5f661bff_Amenities-Icon-1.svg", label: "Activities" },
  { icon: "/assets/6a67938cce1a3e67fffa5461_Amenities-Icon-2.svg", label: "Meals" },
  { icon: "/assets/6a67938c15159e1def8e90f4_Amenities-Icon-3.svg", label: "Airport" },
];

/** "Back to Packages", title, summary, inclusions and the photo gallery. */
export function PackageHero({ pkg }: { pkg: PackageDetail }) {
  return (
    <section>
      <div className="container-site">
        <div className="flex w-full flex-col items-start justify-start gap-6 border-b border-[#e2e2e2] pt-[140px] pb-[120px] max-lg:pb-20 max-md:pt-[120px] max-md:pb-15 max-sm:pt-[100px]">
          <Reveal from="left" delay={50} className="max-w-full">
            <Link
              href="/packages"
              className="flex items-center justify-start gap-1 text-slate no-underline transition-colors duration-250 ease-[ease] hover:text-navy"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden className="block size-5">
                <path
                  d="M15.8342 9.58333H5.22172L9.06922 5.73583L8.48005 5.14667L4.54922 9.0775C4.04089 9.58583 4.04089 10.4142 4.54922 10.9225L8.48089 14.8542L9.07005 14.265L5.22255 10.4175H15.8342V9.58417V9.58333Z"
                  fill="currentColor"
                />
              </svg>
              <span>Back to Packages</span>
            </Link>
          </Reveal>
          <div className="grid w-full grid-cols-2 items-start gap-x-8 gap-y-[200px] max-lg:flex max-lg:flex-col max-lg:gap-10 max-sm:gap-[25px]">
            <div className="flex flex-col items-stretch justify-start gap-4 max-lg:w-full max-lg:gap-[30px]">
              <Reveal
                as="h2"
                from="left"
                delay={100}
                className="m-0 font-serif text-[48px]/[112%] max-md:text-[40px]/[112%]"
              >
                {pkg.title}
              </Reveal>
              <div className="flex items-center justify-start gap-6 max-md:flex-wrap max-md:gap-y-4 max-sm:gap-4">
                <Reveal
                  from="left"
                  delay={2}
                  className="flex flex-col items-start justify-start gap-8"
                >
                  <p className="m-0 font-serif text-[24px]/[36px] font-light text-slate-400 max-lg:max-w-[720px] max-md:text-[20px]/[28px]">
                    {pkg.summary}
                  </p>
                </Reveal>
              </div>
              <Reveal from="left" delay={100} className="mt-4 flex flex-col gap-5">
                <h5 className="m-0 border-b border-line-strong pb-3 text-navy-800">Inclusions</h5>
                <ul className="m-0 grid list-none grid-cols-2 gap-x-[31px] gap-y-4 p-0 max-sm:grid-cols-1 max-sm:gap-y-5">
                  {INCLUSIONS.map(({ icon, label }) => (
                    <li key={label} className="flex items-center justify-start gap-2.5">
                      <img src={icon} alt="" className="block w-6 min-w-6" />
                      {label}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <PackageGallery title={pkg.title} cover={pkg.cover} gallery={pkg.gallery} />
          </div>
        </div>
      </div>
    </section>
  );
}
