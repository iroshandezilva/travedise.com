import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";

/**
 * Navy tour teaser inside a blog post (Webflow `.blog-card-detail`): photo left, title,
 * blurb and a white price pill right; stacks at ≤479px. The pill gains a navy outline on hover.
 */
export function BlogPromoCard({
  title = "Kandy Discovery Tour",
  description = "Includes guided monastery visits, local experiences, and trekking.",
  cta = { href: "/contact", label: "From $1,699/Person" },
  image = "/assets/6a30c7d75601d08b07505cb0_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg",
}: {
  title?: string;
  description?: string;
  cta?: { href: string; label: string };
  image?: string;
}) {
  return (
    <Reveal
      delay={100}
      className="mx-auto my-10 grid w-full max-w-[608px] grid-cols-[1fr_.9fr] gap-5 rounded-[20px] bg-navy p-5 max-md:my-[30px] max-sm:grid-cols-1 max-sm:px-4"
    >
      <img src={image} alt={title} loading="lazy" className="block w-full rounded-[15px]" />
      <div className="flex flex-col justify-between max-sm:gap-5">
        <div className="flex flex-col items-start justify-center gap-2.5">
          <h6 className="my-0 text-white">{title}</h6>
          <p className="m-0 text-slate-300">{description}</p>
        </div>
        <Link
          href={cta.href}
          className="block max-w-full rounded-full bg-white px-[21px] py-[13px] text-center text-navy no-underline hover:outline hover:outline-navy-800 max-md:py-2"
        >
          <span className="block h-6 w-full overflow-clip font-heading tracking-[0.4px]">
            {cta.label}
          </span>
        </Link>
      </div>
    </Reveal>
  );
}
