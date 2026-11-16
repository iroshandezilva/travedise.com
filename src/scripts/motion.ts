/**
 * Motion for every page: respond fast, arrive slowly (docs/design.html#motion).
 *
 * - Smooth wheel scrolling with Lenis. Touch keeps native scrolling.
 * - Unfold: groups of cards, rows and steps arrive as you reach them (once, 70ms apart, max 6).
 * - Settle: photos in frames fade in and settle from scale(1.08) when they first come into view.
 * - Drift: full-bleed photo bands move 1:1 with the scroll.
 * - Sheet: the phone menu opens and closes.
 *
 * Nothing above the fold at load is hidden, the page reads without JavaScript (start states are set
 * here, never in CSS), and with reduced motion none of this runs.
 * Values match the --ease-* and --dur-* tokens in src/styles/global.css.
 */
import Lenis from "lenis";
import { animate, inView, scroll, stagger } from "motion";

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;
const DUR = { reveal: 0.9, settle: 1.4, fade: 0.6, sheet: 0.48, sheetOut: 0.24 };
const STEP = 0.07; // seconds between items in a group
const MAX_STAGGER = 6; // later items arrive with the sixth
const RISE = 24; // px an unfolding item travels

export const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const belowFold = (el: Element) => el.getBoundingClientRect().top > innerHeight * 0.92;

/* ---------- Smooth scrolling ---------- */
export const lenis = reduced
  ? null
  : new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      allowNestedScroll: true,
      anchors: { offset: -96 },
    });

/** Stop page scrolling while a menu or sheet is open. */
export function lockScroll(on: boolean) {
  document.body.style.overflow = on ? "hidden" : "";
  if (on) lenis?.stop();
  else lenis?.start();
}

/** Scroll to an element below the header, smoothly when motion is allowed. */
export function scrollToEl(el: Element, offset = -130) {
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset });
  else el.scrollIntoView({ block: "start" });
}

/* ---------- Unfold: groups arrive together, a little apart ---------- */
const GROUPS = [
  ".cardgrid:not(:has([data-item]))", // filterable lists change instantly: people are reading results
  ".steps4", ".cols3", ".facts", ".rows", ".gds", ".soon-grid", ".princ", ".proof",
  ".also", ".every", ".fest", ".dish", ".wild", ".sec-head",
].join(",");

let queue: HTMLElement[] = [];
let queued = false;
function flush() {
  queued = false;
  const items = queue.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  queue = [];
  items.forEach((el, i) => {
    animate(
      el,
      { opacity: [0, 1], transform: [`translateY(${RISE}px)`, "translateY(0px)"] },
      { duration: DUR.reveal, ease: EASE_OUT, delay: Math.min(i, MAX_STAGGER) * STEP },
    ).then(() => { el.style.transform = ""; el.style.opacity = ""; });
  });
}
function unfoldLater(el: HTMLElement) {
  el.style.opacity = "0";
  el.style.transform = `translateY(${RISE}px)`;
  inView(el, () => {
    queue.push(el);
    if (!queued) { queued = true; requestAnimationFrame(flush); }
  }, { amount: 0.15 });
}
/** Unfold elements now (for content that appears after an action, like the enquiry thank-you). */
export function unfoldNow(els: Element[]) {
  if (reduced) return;
  animate(els as HTMLElement[], { opacity: [0, 1], transform: [`translateY(${RISE}px)`, "translateY(0px)"] }, { duration: DUR.reveal, ease: EASE_OUT, delay: stagger(STEP) });
}

/* ---------- Settle: photos come to rest ---------- */
function settleLater(frame: HTMLElement) {
  const img = frame.querySelector<HTMLImageElement>(".px img");
  if (!img) return;
  img.style.opacity = "0";
  img.style.transform = "scale(1.08)";
  inView(frame, () => {
    const go = () => {
      animate(img, { opacity: [0, 1] }, { duration: DUR.fade, ease: EASE_OUT });
      animate(img, { transform: ["scale(1.08)", "scale(1)"] }, { duration: DUR.settle, ease: EASE_OUT });
    };
    if (img.complete && img.naturalWidth) go();
    else img.addEventListener("load", go, { once: true });
  }, { amount: 0.15 });
}

/* ---------- Drift: photo bands move with the scroll, 1:1 ---------- */
function drift(layer: HTMLElement, target: Element, scale = 1.12) {
  const s = scale === 1 ? "" : ` scale(${scale})`; // the scale covers the travel, so no edge shows
  scroll(
    animate(layer, { transform: [`translateY(-6%)${s}`, `translateY(6%)${s}`] }, { ease: "linear" }),
    { target, offset: ["start end", "end start"] },
  );
}

/* ---------- Sheet: the phone menu ---------- */
export async function sheet(el: HTMLElement, open: boolean) {
  if (reduced) { el.hidden = !open; return; }
  if (open) {
    el.style.pointerEvents = ""; // reopened during the fade: cancel the pending hide
    el.hidden = false;
    animate(el, { opacity: [0, 1], transform: ["translateY(-8px)", "translateY(0px)"] }, { duration: DUR.sheet, ease: EASE_DRAWER });
    animate(Array.from(el.children) as HTMLElement[], { opacity: [0, 1], transform: ["translateY(8px)", "translateY(0px)"] }, { duration: DUR.sheet, ease: EASE_DRAWER, delay: stagger(0.04, { startDelay: 0.06 }) });
  } else {
    el.style.pointerEvents = "none"; // the page underneath is usable while the sheet fades
    await animate(el, { opacity: 0 }, { duration: DUR.sheetOut, ease: EASE_OUT });
    if (el.style.pointerEvents === "none") { el.hidden = true; el.style.opacity = ""; }
    el.style.pointerEvents = "";
  }
}

/* ---------- Start ---------- */
if (!reduced) {
  // Only what is below the fold waits for the reader; what is already in view stays put.
  for (const group of $$(GROUPS)) {
    if (group.closest(".mnav, .dd, [data-no-reveal]")) continue;
    for (const item of Array.from(group.children) as HTMLElement[]) if (belowFold(item)) unfoldLater(item);
  }
  for (const frame of $$(".frame")) if (!frame.closest("[data-no-reveal]") && belowFold(frame)) settleLater(frame);
  for (const layer of $$(".band > .px, .phero > .px, .close-band > .px")) {
    const img = layer.querySelector("img");
    if (img) drift(img as HTMLElement, layer.parentElement!);
  }
  // The film poster and video are already 116% tall, so they drift without scaling.
  for (const el of $$("[data-pl]")) drift(el, el.closest("section") ?? el.parentElement!, 1);
}
