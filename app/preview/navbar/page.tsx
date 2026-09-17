"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Navbar, type NavbarProps } from "@/components/site/navbar";

// One navbar per page (it's fixed and scroll-driven). Switch with ?v=<preset>.
const PRESETS: Record<string, NavbarProps & { hero: "photo" | "light" }> = {
  home: { variant: "transparent", current: "/", hideOnScroll: false, hero: "photo" },
  about: { variant: "transparent", current: "/about", hero: "photo" },
  post: { variant: "transparent", hero: "photo" },
  faq: { hero: "light" },
  contact: { current: "/contact", hero: "light" },
  package: { fillOnScroll: false, hideOnScroll: false, hero: "light" },
};

function Preview() {
  const key = useSearchParams().get("v") ?? "home";
  const { hero, ...props } = PRESETS[key] ?? PRESETS.home;
  return (
    <div className="-m-10 self-stretch">
      <Navbar {...props} />
      <section
        className={
          hero === "photo"
            ? "flex h-screen flex-col items-center justify-end gap-6 bg-[linear-gradient(#fff0,#000000c2),url(/assets/6a31a4873538dd93efc55bb9_889689e1828de5f6781845e9fddc75b38b82b15e.jpg)] bg-cover pb-24 text-white"
            : "flex h-screen flex-col items-center justify-end gap-6 bg-[#f7fbef] pb-24"
        }
      >
        <h1 className={hero === "photo" ? "text-white" : undefined}>Navbar · {key}</h1>
        <ul className="flex flex-wrap justify-center gap-3" data-test="presets">
          {Object.keys(PRESETS).map((k) => (
            <li key={k}>
              <Link
                href={`/preview/navbar?v=${k}`}
                className="rounded-full border border-current px-3 py-1 no-underline"
              >
                {k}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {/* Page length so the 3%-of-scroll fill and hide-on-scroll-down can be tested. */}
      <div className="container-site flex flex-col gap-10 py-20">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-[400px] rounded-card bg-surface p-10">
            Section {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NavbarPreview() {
  return (
    <Suspense>
      <Preview />
    </Suspense>
  );
}
