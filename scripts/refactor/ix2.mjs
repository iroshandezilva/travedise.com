#!/usr/bin/env node
/**
 * Webflow Interactions (IX2) catalog for one page — what each animated element does,
 * so it can be rebuilt with CSS / <Reveal> / motion.
 *
 *   node scripts/refactor/ix2.mjs app/faq/page.tsx
 *
 * For every data-w-id in the file (in source order) it prints the element, then each
 * trigger (scroll into view, hover, click, page scroll…) with its timeline: which target
 * (the element itself, a child selector, a sibling) animates which property, from→to,
 * duration, easing and delay. Page-level triggers (navbar on scroll etc.) come last.
 */
import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("usage: ix2.mjs app/<route>/page.tsx");
  process.exit(1);
}

const bundle = fs.readFileSync(new URL("../../public/js/webflow.schunk.72d587c97fcfb3e2.js", import.meta.url), "utf8");
const marker = 'require("ix2").init(';
const start = bundle.indexOf(marker) + marker.length;
let depth = 0, end = start, quote = null;
for (; end < bundle.length; end++) {
  const c = bundle[end];
  if (quote) {
    if (c === "\\") end++;
    else if (c === quote) quote = null;
    continue;
  }
  if (c === '"' || c === "'") quote = c;
  else if (c === "{") depth++;
  else if (c === "}" && --depth === 0) { end++; break; }
}
const data = new Function(`return ${bundle.slice(start, end)}`)();
const events = Object.values(data.events);
const lists = data.actionLists;

const src = fs.readFileSync(file, "utf8");
const pageId = src.match(/pageId="([^"]+)"/)?.[1];

// data-w-id → opening tag summary
const elements = [];
for (const m of src.matchAll(/<(\w+)((?:[^>"]|"[^"]*")*?)data-w-id="([^"]+)"((?:[^>"]|"[^"]*")*)>/g)) {
  const attrs = m[2] + m[4];
  const cls = attrs.match(/className="([^"]*)"/)?.[1] ?? "";
  elements.push({ id: m[3], tag: m[1], cls, line: src.slice(0, m.index).split("\n").length });
}

const fmtTarget = (t = {}) => {
  if (t.useEventTarget === true) return "self";
  if (t.useEventTarget === "CHILDREN") return `child ${t.selector}`;
  if (t.useEventTarget === "PARENT") return `parent ${t.selector}`;
  if (t.useEventTarget === "SIBLINGS") return `sibling ${t.selector}`;
  if (t.selector) return `any ${t.selector}`;
  if (t.id) return `#${t.id.split("|").pop()}`;
  return t.appliesTo ?? "?";
};
const fmtValue = (type, c) => {
  switch (type) {
    case "TRANSFORM_MOVE": return `translate(${c.xValue ?? 0}${(c.xUnit ?? "").toLowerCase()}, ${c.yValue ?? 0}${(c.yUnit ?? "").toLowerCase()})`;
    case "TRANSFORM_SCALE": return `scale(${c.xValue ?? 1}, ${c.yValue ?? 1})`;
    case "TRANSFORM_ROTATE": return `rotate(${c.zValue ?? c.xValue ?? 0}${(c.zUnit ?? c.xUnit ?? "deg").toLowerCase()})`;
    case "STYLE_OPACITY": return `opacity ${c.value}`;
    case "STYLE_SIZE": return `size ${c.widthValue ?? "auto"}${(c.widthUnit ?? "").toLowerCase()} × ${c.heightValue ?? "auto"}${(c.heightUnit ?? "").toLowerCase()}`;
    case "GENERAL_DISPLAY": return `display ${c.value}`;
    case "STYLE_BACKGROUND_COLOR": return `background rgba(${c.rValue},${c.gValue},${c.bValue},${c.aValue})`;
    case "STYLE_TEXT_COLOR": return `color rgba(${c.rValue},${c.gValue},${c.bValue},${c.aValue})`;
    case "STYLE_BORDER": return `border-color rgba(${c.rValue},${c.gValue},${c.bValue},${c.aValue})`;
    case "PLUGIN_LOTTIE": return `lottie → ${c.value}%`;
    default: return `${type} ${JSON.stringify(c)}`;
  }
};
const describeList = (listId) => {
  const list = lists[listId];
  if (!list) return [`    (preset ${listId})`];
  const lines = [`    timeline "${list.title ?? listId}"${list.useFirstGroupAsInitialState ? " (first step = initial state)" : ""}`];
  (list.actionItemGroups ?? []).forEach((g, i) => {
    const items = g.actionItems.map((x) => {
      const c = x.config;
      const timing = c.duration ? ` ${c.duration}ms ${c.easing ?? "linear"}${c.delay ? ` +${c.delay}ms` : ""}` : c.delay ? ` +${c.delay}ms` : " instant";
      return `${fmtTarget(c.target)}: ${fmtValue(x.actionTypeId, c)}${timing}`;
    });
    lines.push(`      step ${i + 1}: ${items.join(" | ")}`);
  });
  for (const cg of list.continuousParameterGroups ?? []) {
    lines.push(`      scroll-linked (${cg.type}):`);
    for (const ag of cg.continuousActionGroups ?? []) {
      lines.push(`        at ${ag.keyframe}%: ${ag.actionItems.map((x) => `${fmtTarget(x.config.target)}: ${fmtValue(x.actionTypeId, x.config)}`).join(" | ")}`);
    }
  }
  return lines;
};
const describeEvent = (e) => {
  const c = e.config ?? {};
  const cfg = [];
  if (c.delay) cfg.push(`delay ${c.delay}ms`);
  if (c.scrollOffsetValue != null) cfg.push(`offset ${c.scrollOffsetValue}${c.scrollOffsetUnit}`);
  if (c.direction) cfg.push(`from ${c.direction}`);
  if (c.loop) cfg.push("loop");
  if (e.mediaQueries?.length && e.mediaQueries.length < 4) cfg.push(`only at ${e.mediaQueries.join(",")}`);
  const listId = e.action?.config?.actionListId;
  const head = `  ${e.eventTypeId}${e.animationType === "preset" ? ` preset:${listId}` : ""}${cfg.length ? ` (${cfg.join(", ")})` : ""}`;
  if (listId === "slideInBottom" || listId === "slideInLeft" || listId === "fadeIn")
    return [head + " → use <Reveal>"];
  return [head, ...describeList(listId)];
};

// Prefer events bound to this page; symbol instances (navbar, footer) are often bound to another page id.
const eventsFor = (wid) => {
  const all = events.filter((e) => (e.target?.id ?? "").split("|").pop() === wid);
  const own = all.filter((e) => e.target.id.startsWith(`${pageId}|`));
  const pick = own.length ? own : all;
  const seen = new Set();
  return pick.filter((e) => {
    const k = `${e.eventTypeId}:${e.action?.config?.actionListId}`;
    return seen.has(k) ? false : (seen.add(k), true);
  });
};

console.log(`# IX2 catalog for ${file} (page ${pageId})\n`);
console.log("Timing reference: outQuart ≈ cubic-bezier(0.25,1,0.5,1), outQuint ≈ cubic-bezier(0.22,1,0.36,1), ease ≈ ease, inOutQuart ≈ cubic-bezier(0.76,0,0.24,1)\n");
for (const el of elements) {
  const evs = eventsFor(el.id);
  console.log(`L${el.line} <${el.tag} class="${el.cls}"> w-id ${el.id}${evs.length ? "" : "  (no interaction)"}`);
  for (const e of evs) describeEvent(e).forEach((l) => console.log(l));
}
const pageEvents = events.filter((e) => e.target?.appliesTo === "PAGE" && e.target.id === pageId);
if (pageEvents.length) {
  console.log("\n## Page-level triggers");
  for (const e of pageEvents) describeEvent(e).forEach((l) => console.log(l));
}
