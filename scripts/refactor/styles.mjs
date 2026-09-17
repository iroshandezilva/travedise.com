#!/usr/bin/env node
/**
 * Computed styles of a reference subtree, across breakpoints — the source of truth
 * for translating Webflow classes into Tailwind utilities.
 *
 *   node scripts/refactor/styles.mjs --route /faq --sel "section.footer" [--widths 1440,991,767,390] [--depth 99]
 *
 * Prints an indented element tree. Each element lists only the properties that differ
 * from a bare element of the same tag; values that change across widths are shown as
 * `1440:40px 991:32px 390:24px`. Also prints :hover-independent pseudo content (::before/::after).
 */
import { REF, args, widthsArg, launch, openPage, settle } from "./lib.mjs";

const a = args();
if (!a.route || !a.sel) {
  console.error('usage: styles.mjs --route /path --sel "css selector" [--widths ...] [--depth N] [--url base]');
  process.exit(1);
}
const base = a.url ?? REF;
const depth = Number(a.depth ?? 99);

const PROPS = [
  "display", "position", "top", "right", "bottom", "left", "z-index",
  "flex-direction", "flex-wrap", "justify-content", "align-items", "align-self", "flex-grow", "flex-shrink", "flex-basis", "order",
  "grid-template-columns", "grid-template-rows", "grid-column", "grid-row", "column-gap", "row-gap",
  "min-width", "max-width", "min-height", "max-height", "aspect-ratio",
  "margin-top", "margin-right", "margin-bottom", "margin-left",
  "padding-top", "padding-right", "padding-bottom", "padding-left",
  "font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing", "text-align", "text-transform", "text-decoration-line", "white-space",
  "color", "background-color", "background-image", "background-size", "background-position",
  "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-style", "border-top-color", "border-bottom-color",
  "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius",
  "box-shadow", "opacity", "overflow-x", "overflow-y", "object-fit", "object-position",
  "transform", "transition", "backdrop-filter", "filter", "mix-blend-mode", "cursor", "pointer-events", "visibility",
];

const INHERITED = new Set([
  "font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing",
  "text-align", "text-transform", "white-space", "color", "cursor", "visibility", "pointer-events",
]);

// Rendered size is reported as (box); inherited props only where they change from the parent.
function snapshot({ sel, props, maxDepth, inherited }) {
  const root = document.querySelector(sel);
  if (!root) return null;
  const baselines = new Map();
  const frame = document.createElement("iframe");
  frame.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
  document.body.appendChild(frame);
  const bdoc = frame.contentDocument;
  const baseline = (tag) => {
    if (!baselines.has(tag)) {
      const el = bdoc.createElement(tag);
      bdoc.body.appendChild(el);
      const cs = getComputedStyle(el);
      baselines.set(tag, Object.fromEntries(props.map((p) => [p, cs.getPropertyValue(p)])));
    }
    return baselines.get(tag);
  };
  const out = [];
  const walk = (el, d, pathKey) => {
    const cs = getComputedStyle(el);
    const b = baseline(el.tagName.toLowerCase());
    const parent = el.parentElement ? getComputedStyle(el.parentElement) : null;
    const styles = {};
    for (const p of props) {
      const v = cs.getPropertyValue(p);
      if (p.startsWith("border-") && p.endsWith("-color")) {
        const side = p.split("-")[1];
        if (cs.getPropertyValue(`border-${side}-width`) === "0px") continue;
      }
      if (inherited.includes(p) && d > 0 && parent) {
        if (v !== parent.getPropertyValue(p)) styles[p] = v;
      } else if (v !== b[p]) styles[p] = v;
    }
    const r = el.getBoundingClientRect();
    styles["(box)"] = `${Math.round(r.width)}x${Math.round(r.height)}`;
    for (const pseudo of ["::before", "::after"]) {
      const ps = getComputedStyle(el, pseudo);
      if (ps.content && ps.content !== "none" && ps.content !== "normal") styles[pseudo] = `content:${ps.content}`;
    }
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(" ").slice(0, 50);
    out.push({
      key: pathKey,
      d,
      label: `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : ""}` +
        (el.getAttribute("src") ? ` src=${el.getAttribute("src").split("/").pop().slice(0, 40)}` : "") +
        (el.getAttribute("href") ? ` href=${el.getAttribute("href")}` : "") +
        (text ? ` "${text}"` : ""),
      styles,
    });
    if (d < maxDepth) [...el.children].forEach((c, i) => walk(c, d + 1, `${pathKey}/${i}`));
  };
  walk(root, 0, "0");
  frame.remove();
  return out;
}

const browser = await launch();
const perWidth = new Map();
const widths = widthsArg(a.widths);
for (const width of widths) {
  const { page, context } = await openPage(browser, base + a.route, width);
  await settle(page);
  const snap = await page.evaluate(snapshot, { sel: a.sel, props: PROPS, maxDepth: depth, inherited: [...INHERITED] });
  if (!snap) {
    console.error(`selector not found at ${width}px: ${a.sel}`);
    process.exit(2);
  }
  perWidth.set(width, new Map(snap.map((n) => [n.key, n])));
  await context.close();
}
await browser.close();

const first = perWidth.get(widths[0]);
for (const [key, node] of first) {
  const props = new Set();
  for (const w of widths) Object.keys(perWidth.get(w).get(key)?.styles ?? {}).forEach((p) => props.add(p));
  const parts = [];
  for (const p of props) {
    const vals = widths.map((w) => perWidth.get(w).get(key)?.styles[p] ?? "·");
    const same = vals.every((v) => v === vals[0]);
    parts.push(same ? `${p}: ${vals[0]}` : `${p}: ${widths.map((w, i) => `${w}:${vals[i]}`).join(" ")}`);
  }
  const pad = "  ".repeat(node.d);
  console.log(`${pad}${node.label}`);
  for (const line of parts) console.log(`${pad}    ${line}`);
}
