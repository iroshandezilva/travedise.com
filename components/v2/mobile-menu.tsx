"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { SOCIALS } from "@/components/site/social-links";
import { images } from "@/content/v2/images";
import { menuFeature, mobileNavLinks } from "@/content/v2/shared";

import { LogoMark } from "./logo";

/**
 * The phone menu: a hamburger in the hero's nav pill that opens a full-screen panel.
 * Only shown below the `md` breakpoint — the desktop bar lists its links inline.
 *
 * The panel is rendered into `document.body` rather than in place. The nav pill it sits
 * in carries a backdrop-filter, and that makes the pill the containing block for any
 * `position: fixed` descendant, which would pin the panel inside the pill.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  // The portal target only exists in the browser; the static export has no body yet.
  useEffect(() => setMounted(true), []);

  // While the panel is up: hold the page still behind it, close on Escape, and move
  // focus into the panel so a keyboard lands on the close button rather than the page.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Returning focus to the hamburger belongs to closing, not to opening.
  const close = () => {
    setOpen(false);
    openRef.current?.focus();
  };

  return (
    <>
      <button
        ref={openRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="hidden size-[46px] shrink-0 flex-col items-center justify-center gap-[5px] rounded-full bg-white/14 max-md:flex"
      >
        <span aria-hidden className="block h-[1.5px] w-[18px] bg-white" />
        <span aria-hidden className="block h-[1.5px] w-3 bg-white" />
      </button>

      {mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-open={open}
            inert={!open}
            className="v2-menu fixed inset-0 z-50 overflow-y-auto bg-[#0c1526] md:hidden"
          >
            <img
              src={images.honeymoon}
              alt=""
              className="absolute inset-0 block size-full object-cover opacity-[0.32]"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, oklab(0.16 -0.01 -0.02 / 0.86) 0%, oklab(0.13 -0.01 -0.02 / 0.94) 62%, oklab(0.12 -0.01 -0.02 / 0.98) 100%)",
              }}
            />

            <div className="relative flex min-h-dvh flex-col px-5 pt-[18px] pb-7">
              <div className="flex h-13 shrink-0 items-center justify-between">
                <Link
                  href="/"
                  aria-label="Travedise home"
                  onClick={close}
                  className="flex items-center gap-2"
                >
                  <LogoMark className="h-6 w-[34px]" />
                  <span className="font-display text-[21px]/[26px] font-medium text-white">
                    Travedise
                  </span>
                </Link>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="flex size-[46px] items-center justify-center rounded-full border border-white/24 bg-white/14"
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]">
                    <path
                      d="M5 5 L19 19 M19 5 L5 19"
                      stroke="#fff"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </button>
              </div>

              <nav aria-label="Menu" className="mt-[34px] flex flex-col">
                {mobileNavLinks.map(({ href, label }, i) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={close}
                    style={{ "--i": i } as React.CSSProperties}
                    className="v2-menu-item flex items-center justify-between py-[13px]"
                  >
                    <span className="font-display text-[34px]/[42px] text-white">{label}</span>
                    <span aria-hidden className="text-[17px] text-white/50">
                      ↗
                    </span>
                  </Link>
                ))}
              </nav>

              <Link
                href={menuFeature.href}
                onClick={close}
                style={{ "--i": mobileNavLinks.length } as React.CSSProperties}
                className="v2-menu-item mt-[26px] flex items-center gap-3.5 rounded-[18px] border border-white/16 bg-white/8 p-3"
              >
                <img
                  src={menuFeature.image}
                  alt=""
                  className="block size-[76px] shrink-0 rounded-xl object-cover"
                />
                <span className="flex flex-col gap-[5px]">
                  <span className="font-display text-[17px]/[22px] font-medium text-white">
                    {menuFeature.title}
                  </span>
                  <span className="text-[13px]/[19px] text-[#d9e4e9e6]">{menuFeature.body}</span>
                </span>
              </Link>

              <div className="mt-auto flex flex-col gap-[18px] pt-10">
                <Link
                  href="/contact"
                  onClick={close}
                  className="flex h-[54px] items-center justify-center rounded-[27px] bg-v2-sky text-[16px] font-semibold text-[#10212b]"
                >
                  Plan your trip ↗
                </Link>
                <div className="flex items-center gap-[18px]">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#e2eaeed9]"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
