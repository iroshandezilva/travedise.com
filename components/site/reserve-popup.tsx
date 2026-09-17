"use client";

import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";

const FADE_MS = 300;

const FIELD = "mb-2.5 flex flex-col items-start justify-center gap-1.5";
const LABEL = "mb-0 text-xs/[150%] font-semibold tracking-[1.2px] text-navy uppercase";
const INPUT =
  "block h-[52px] w-full rounded-lg border border-navy/10 bg-white px-5 py-4 align-middle text-sm/5 text-navy placeholder:text-slate-400 focus:border-navy/10 focus:outline-0 max-sm:h-[46px] max-sm:p-4";
const PILL =
  "mt-[5px] inline-block w-full cursor-pointer rounded-full border px-[18px] py-[13px] text-center leading-6 no-underline transition-all duration-250 ease-[ease]";

/**
 * "Reserve Now" side panel over a navy scrim. The form has no backend: submitting does nothing.
 * The cross fades the popup out (300ms) and calls `onOpenChange(false)`.
 *
 * Controlled with `open` / `onOpenChange`, or uncontrolled with `defaultOpen`. On the Webflow
 * site nothing ever opens it (only the close interaction exists), so pages render it closed.
 */
export function ReservePopup({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const [closing, setClosing] = useState(false);
  const titleId = useId();

  const close = () => {
    if (closing) return;
    setClosing(true);
  };

  useEffect(() => {
    if (!closing) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(
      () => {
        setClosing(false);
        setOpenState(false);
        onOpenChange?.(false);
      },
      reduce ? 0 : FADE_MS,
    );
    return () => clearTimeout(t);
  }, [closing, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setClosing(true);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        "fixed inset-0 z-99999 flex w-full items-start justify-end overflow-auto bg-navy/50 transition-opacity duration-300 ease-linear max-sm:items-center max-sm:justify-center",
        closing && "opacity-0",
      )}
    >
      <div className="relative my-5 mr-5 w-full max-w-[440px] overflow-clip rounded-card bg-surface px-[30px] pt-10 pb-[30px] max-lg:px-5 max-sm:mr-0 max-sm:px-4 max-sm:py-[25px]">
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute top-[25px] right-[25px] w-[18px] cursor-pointer max-sm:top-5 max-sm:right-5 max-sm:w-4"
        >
          <img src="/assets/69c38c90a6a389dfc58352a6_cross.webp" alt="" className="block w-full" />
        </button>
        <div className="mb-[30px] flex flex-col items-center justify-center">
          <h3 id={titleId} className="text-center">
            Reserve Now
          </h3>
          <p className="text-center">You’ll receive a confirmation within 24h.</p>
        </div>
        <form name="Reserve Form" className="overflow-clip" onSubmit={(e) => e.preventDefault()}>
          <div className={FIELD}>
            <label htmlFor="Reserve-Name" className={LABEL}>
              Name
            </label>
            <input
              className={INPUT}
              maxLength={256}
              name="Reserve-Name"
              placeholder="Your Name"
              type="text"
              id="Reserve-Name"
              required
            />
          </div>
          <div className={FIELD}>
            <label htmlFor="Reserve-Email" className={LABEL}>
              Email
            </label>
            <input
              className={INPUT}
              maxLength={256}
              name="Reserve-Email"
              placeholder="name@email.com"
              type="email"
              id="Reserve-Email"
              required
            />
          </div>
          <div className={FIELD}>
            <label htmlFor="Reserve-Number-of-Guests" className={LABEL}>
              Number of Guests
            </label>
            <input
              className={INPUT}
              maxLength={256}
              name="Reserve-Number-of-Guests"
              placeholder="3 Person"
              type="text"
              id="Reserve-Number-of-Guests"
              required
            />
          </div>
          <div className={FIELD}>
            <label htmlFor="Choice-Tour" className={LABEL}>
              Select your package
            </label>
            <select
              id="Choice-Tour"
              name="Choice-Tour"
              className={cn(
                INPUT,
                "appearance-none bg-[url(/assets/69c38c90a6a389dfc58352a5_angle-small-down.webp)] bg-size-[24px] bg-position-[96%] bg-no-repeat py-2.5 text-slate-400 max-sm:py-2.5",
              )}
            >
              <option value="">Choice Tour</option>
              <option value="Bali Tour">Bali Tour</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
          <div className={FIELD}>
            <label htmlFor="Reserve-Message" className={LABEL}>
              Special Notes
            </label>
            <textarea
              id="Reserve-Message"
              name="Reserve-Message"
              maxLength={5000}
              placeholder="Write your message here"
              required
              className={cn(INPUT, "h-[140px] max-sm:h-[100px]")}
            />
          </div>
          <input
            type="submit"
            value="Send Message"
            className={cn(
              PILL,
              "border-navy/10 bg-navy text-white hover:border-transparent hover:bg-lime hover:text-navy",
            )}
          />
          <a
            href="https://www.pixoora.com/"
            target="_blank"
            rel="noopener"
            className={cn(
              PILL,
              "border-transparent bg-lime text-navy hover:border-navy/10 hover:bg-navy hover:text-white",
            )}
          >
            Pay With Pixopay
          </a>
        </form>
      </div>
    </div>
  );
}
