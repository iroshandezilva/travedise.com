"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { cn } from "@/lib/cn";

/** Webflow's lightbox runs every fade / slide at 300ms with tram's default `ease`. */
const FADE_MS = 300;
const FADE = "duration-300 ease-[ease] motion-reduce:transition-none";

type View = { id: number; index: number; from: number };

export type LightboxProps = {
  /** Image URLs. More than one turns on the thumbnail strip and the prev / next arrows. */
  images: string[];
  /** Index shown first. */
  start: number;
  onClose: () => void;
  label?: string;
};

/**
 * Full-screen photo viewer, rebuilt from Webflow's `w-lightbox`: a 90% black backdrop that
 * fades in, the photo centred (clicking it goes to the next one, clicking around it closes),
 * arrows and a thumbnail strip for groups, ←/→/Esc keys and touch swipes. Mount it to open.
 */
export function Lightbox({ images, start, onClose, label = "Photo gallery" }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const swipeX = useRef<number | null>(null);
  const [shown, setShown] = useState(false);
  const [views, setViews] = useState<View[]>([{ id: 0, index: start, from: 0 }]);
  const index = views[views.length - 1].index;
  const group = images.length > 1;

  useEffect(() => {
    const el = dialog.current!;
    const html = document.documentElement;
    const overflow = html.style.overflow;
    const trigger = document.activeElement as HTMLElement | null;
    el.showModal();
    closeButton.current?.focus(); // like Webflow; showModal would pick the first control
    html.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => setShown(true));
    return () => {
      cancelAnimationFrame(frame);
      html.style.overflow = overflow;
      if (el.open) el.close();
      // The dialog may already be detached by now, so hand focus back explicitly.
      trigger?.focus();
    };
  }, []);

  const close = () => {
    setShown(false);
    setTimeout(onClose, FADE_MS);
  };

  const show = (next: number) => {
    if (next === index || next < 0 || next >= images.length) return;
    setViews((vs) => [
      ...vs,
      { id: vs[vs.length - 1].id + 1, index: next, from: next > index ? 80 : -80 },
    ]);
    // The outgoing view fades out, then leaves the DOM.
    setTimeout(() => setViews((vs) => vs.slice(-1)), FADE_MS);
  };

  useEffect(() => {
    // An arrow that just went inactive hands focus to the opposite one (as Webflow does).
    const active = document.activeElement;
    if (active?.getAttribute("data-arrow") && active.getAttribute("aria-hidden") === "true") {
      dialog.current?.querySelector<HTMLElement>("[data-arrow][aria-hidden='false']")?.focus();
    }
    strip.current
      ?.querySelector("[aria-current='true']")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [index]);

  const onSwipeStart = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") swipeX.current = e.clientX;
  };
  const onSwipeEnd = (e: PointerEvent) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (dx < -50) show(index + 1);
    else if (dx > 50) show(index - 1);
  };

  const control =
    "absolute top-0 cursor-pointer border-0 bg-transparent p-0 transition-all duration-300 ease-[ease] md:hover:opacity-100";
  const arrow = (dir: -1 | 1) => {
    const inactive = dir < 0 ? index === 0 : index === images.length - 1;
    return (
      <button
        type="button"
        data-arrow={dir < 0 ? "left" : "right"}
        aria-label={dir < 0 ? "previous image" : "next image"}
        aria-hidden={inactive}
        tabIndex={inactive ? -1 : 0}
        onClick={() => show(index + dir)}
        className={cn(
          control,
          "bottom-0 hidden w-[4em] items-center justify-center md:flex md:opacity-50",
          dir < 0 ? "left-0" : "right-0",
          inactive && "opacity-0 md:opacity-0 md:hover:opacity-0",
        )}
      >
        <svg viewBox={dir < 0 ? "-20 0 24 40" : "-4 0 24 40"} className="h-10 w-6" aria-hidden>
          <g transform="rotate(45)">
            <path d={dir < 0 ? "m0 0h5v23h23v5h-28z" : "m0-0h28v28h-5v-23h-23z"} opacity=".4" />
            <path d={dir < 0 ? "m1 1h3v23h23v3h-26z" : "m1 1h26v26h-3v-23h-23z"} fill="#fff" />
          </g>
        </svg>
      </button>
    );
  };

  return (
    <dialog
      ref={dialog}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") show(index - 1);
        else if (e.key === "ArrowRight") show(index + 1);
      }}
      className={cn(
        "fixed inset-0 m-0 size-full max-h-none max-w-none overflow-auto border-0 bg-black/90 p-0 text-center font-[Helvetica_Neue,Helvetica,Ubuntu,Segoe_UI,Verdana,sans-serif] text-[17px]/[1.2] font-light text-white outline-0 select-none backdrop:bg-transparent",
        "opacity-0 transition-opacity",
        FADE,
        shown && "opacity-100",
      )}
    >
      <div
        onPointerDown={onSwipeStart}
        onPointerUp={onSwipeEnd}
        onPointerCancel={() => (swipeX.current = null)}
        className={cn(
          "relative h-screen overflow-hidden md:mt-[2vh] md:h-[96vh]",
          group && "h-[86vh] md:h-[84vh]",
        )}
      >
        {views.map((view) => {
          const leaving = view !== views[views.length - 1];
          return (
            <div
              key={view.id}
              onClick={(e) => e.target === e.currentTarget && close()}
              style={{ "--from": `${view.from}px` } as CSSProperties}
              className={cn(
                "absolute inset-y-0 w-screen transition-[opacity,translate]",
                FADE,
                // The strut centres the photo vertically, as Webflow's `.w-lightbox-view:before`.
                "before:inline-block before:h-full before:align-middle before:content-['']",
                view.from !== 0 && "starting:translate-x-(--from) starting:opacity-0",
                leaving && "opacity-0",
              )}
            >
              <div
                onClick={(e) => e.target === e.currentTarget && close()}
                className="inline-block align-middle"
              >
                <figure className="relative m-0">
                  <img
                    src={images[view.index]}
                    alt=""
                    draggable={false}
                    onClick={() => show(view.index + 1)}
                    className={cn(
                      "block h-auto max-h-screen w-auto max-w-screen md:max-h-[96vh] md:max-w-[96vw]",
                      group && "max-h-[86vh] cursor-pointer md:max-h-[84vh] md:max-w-[82.3vw]",
                    )}
                  />
                </figure>
              </div>
            </div>
          );
        })}
        {group && arrow(-1)}
        {group && arrow(1)}
        <button
          type="button"
          aria-label="close lightbox"
          ref={closeButton}
          onClick={close}
          className={cn(
            control,
            "right-0 flex h-[2.6em] w-[4em] items-center justify-center md:opacity-80",
          )}
        >
          <svg viewBox="-4 0 18 17" className="h-[17px] w-[18px]" aria-hidden>
            <g transform="rotate(45)">
              <path d="m0 0h7v-7h5v7h7v5h-7v7h-5v-7h-7z" opacity=".4" />
              <path d="m1 1h7v-7h3v7h7v3h-7v7h-3v-7h-7z" fill="#fff" />
            </g>
          </svg>
        </button>
      </div>
      {group && (
        <div
          ref={strip}
          className="absolute inset-x-0 bottom-0 overflow-x-auto overflow-y-hidden px-[1vh] leading-0 whitespace-nowrap"
        >
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              aria-label={`show item ${i + 1} of ${images.length}`}
              aria-current={i === index}
              onClick={() => show(i)}
              className={cn(
                "box-content inline-block w-[10vh] cursor-pointer border-0 bg-transparent px-[1vh] py-[2vh]",
                i === index && "opacity-30",
              )}
            >
              <span className="relative block h-[10vh] overflow-hidden bg-[#222]">
                <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
              </span>
            </button>
          ))}
        </div>
      )}
    </dialog>
  );
}
