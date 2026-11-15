/**
 * Behaviour for every page. Each part looks for its own markup and does nothing without it,
 * and every page reads fully without JavaScript.
 */
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const motion = () => !reduce.matches;
root.classList.toggle("m-on", motion());
root.style.setProperty("--bleed", ".5");

/* Hero lines rise once per page per visit */
(() => {
  const els = $$(".intro");
  if (!els.length) return;
  let seen: Record<string, 1> = {};
  try { seen = JSON.parse(sessionStorage.getItem("tv-intro") || "{}"); } catch {}
  if (seen[location.pathname] || !motion()) { root.classList.add("no-intro"); els.forEach((el) => el.classList.add("in")); return; }
  seen[location.pathname] = 1;
  try { sessionStorage.setItem("tv-intro", JSON.stringify(seen)); } catch {}
  requestAnimationFrame(() => requestAnimationFrame(() => els.forEach((el) => el.classList.add("in"))));
})();

/* Header: see-through over a photo hero, white after it; hides while scrolling down */
const hdr = $("#hdr");
const hero = $("main > .hero:first-child, main > .phero:first-child");
const mnav = $("#mnav"), menuBtn = $<HTMLButtonElement>("#menuBtn");
let lastY = 0;
const menuOpen = () => !!mnav && !mnav.hidden;
function closeDropdowns(except?: Element) {
  $$(".nav-i.open").forEach((n) => { if (n !== except) { n.classList.remove("open"); n.querySelector("button")?.setAttribute("aria-expanded", "false"); } });
}
function setMenu(open: boolean) {
  if (!mnav || !menuBtn) return;
  mnav.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "Close" : "Menu";
  document.body.style.overflow = open ? "hidden" : "";
  onScroll();
}
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
$$("[data-dd]").forEach((n) => {
  const b = n.querySelector("button")!;
  let t = 0;
  const set = (on: boolean) => { closeDropdowns(n); n.classList.toggle("open", on); b.setAttribute("aria-expanded", String(on)); };
  b.addEventListener("click", () => set(!n.classList.contains("open")));
  if (fine) {
    n.addEventListener("pointerenter", () => { clearTimeout(t); set(true); });
    n.addEventListener("pointerleave", () => { t = window.setTimeout(() => set(false), 160); });
  }
});
menuBtn?.addEventListener("click", () => setMenu(!menuOpen()));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeDropdowns(); if (menuOpen()) { setMenu(false); menuBtn?.focus(); } } });
document.addEventListener("click", (e) => { if (!(e.target as Element).closest(".nav-i")) closeDropdowns(); });

/* Scroll: header state and a gentle parallax on photos */
const px = $$(".frame .px, .band > .px, .phero > .px, .close-band > .px");
const pl = $$("[data-pl]");
function onScroll() {
  const vh = innerHeight, y = scrollY;
  if (hdr) {
    const heroH = hero ? hero.offsetHeight : 0;
    hdr.classList.toggle("solid", menuOpen() || !hero || y > heroH - 90);
    if (!menuOpen() && y > lastY + 2 && y > Math.max(heroH, vh * 0.5)) hdr.classList.add("away");
    else if (y < lastY - 2 || y < 80 || menuOpen()) hdr.classList.remove("away");
    root.classList.toggle("hdr-away", hdr.classList.contains("away"));
  }
  lastY = y;
  if (!motion()) return;
  for (const el of px) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -120 || r.top > vh + 120 || !r.height) continue;
    const p = Math.min(1, Math.max(-1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
    const img = el.firstElementChild as HTMLElement | null;
    if (img) img.style.transform = `translate3d(0,${(p * 30).toFixed(1)}px,0) scale(1.12)`;
  }
  for (const el of pl) {
    const r = el.closest("section")!.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    el.style.transform = `translate3d(0,${(-r.top * Number(el.dataset.pl) * 0.6).toFixed(1)}px,0)`;
  }
}
let ticking = false;
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } }, { passive: true });
addEventListener("resize", () => requestAnimationFrame(onScroll));
onScroll();

/* Tabs: a [role=tablist] whose tabs point at panels with aria-controls */
$$("[role=tablist][data-tabs]").forEach((list) => {
  const tabs = $$<HTMLElement>("[role=tab]", list);
  const select = (tab: HTMLElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls") || "");
      if (panel) panel.hidden = !on;
      const img = t.dataset.img ? document.getElementById(t.dataset.img) : null;
      if (img) img.classList.toggle("on", on);
    });
    if (focus) tab.focus();
  };
  const vertical = list.getAttribute("aria-orientation") === "vertical";
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", (e) => {
      const next = vertical ? "ArrowDown" : "ArrowRight", prev = vertical ? "ArrowUp" : "ArrowLeft";
      if (e.key !== next && e.key !== prev) return;
      e.preventDefault();
      select(tabs[(i + (e.key === next ? 1 : -1) + tabs.length) % tabs.length]!, true);
    });
  });
});

/* Section menu on long pages */
(() => {
  const btns = $$<HTMLButtonElement>(".subnav [data-jump]");
  if (!btns.length) return;
  const mark = (id: string) => btns.forEach((b) => {
    const on = b.dataset.jump === id;
    b.setAttribute("aria-current", String(on));
    if (on) { const p = b.parentElement!; p.scrollTo({ left: b.offsetLeft - p.clientWidth / 2 + b.offsetWidth / 2 }); }
  });
  btns.forEach((b) => b.addEventListener("click", () => {
    document.getElementById(b.dataset.jump!)?.scrollIntoView({ behavior: motion() ? "smooth" : "auto", block: "start" });
    mark(b.dataset.jump!);
  }));
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && mark(e.target.id)), { rootMargin: "-35% 0px -60% 0px" });
  btns.forEach((b) => { const t = document.getElementById(b.dataset.jump!); if (t) io.observe(t); });
})();

/* Month planner: open on this month */
(() => {
  const btns = $$<HTMLButtonElement>("[data-month]");
  if (!btns.length) return;
  const show = (i: number) => {
    btns.forEach((b, j) => b.setAttribute("aria-pressed", String(j === i)));
    $$("[data-mpanel]").forEach((p, j) => (p.hidden = j !== i));
  };
  btns.forEach((b, i) => b.addEventListener("click", () => show(i)));
  show(new Date().getMonth());
})();

/* Filters on the tours and notes lists */
$$("[data-filter-root]").forEach((rootEl) => {
  const list = $(rootEl.dataset.filterRoot!)!;
  const items = $$<HTMLElement>("[data-item]", list);
  const count = $("[data-count]", rootEl);
  const empty = $("[data-empty]");
  const word = rootEl.dataset.word || "item";
  const state: Record<string, string> = {};
  $$<HTMLButtonElement>("[data-f]", rootEl).forEach((c) => { if (c.getAttribute("aria-pressed") === "true") state[c.dataset.f!] = c.dataset.v!; });
  const apply = () => {
    let n = 0;
    for (const el of items) {
      const ok = Object.entries(state).every(([k, v]) => {
        if (!v || v === "all" || v === "any") return true;
        if (k === "len") return v === "short" ? Number(el.dataset.days) <= 9 : Number(el.dataset.days) >= 10;
        return (el.dataset[k] || "").split("|").includes(v);
      });
      el.hidden = !ok;
      if (ok) n++;
    }
    if (count) count.textContent = `${n} ${n === 1 ? word : word + "s"}`;
    if (empty) empty.hidden = n > 0;
  };
  $$<HTMLButtonElement>("[data-f]", rootEl).forEach((c) => c.addEventListener("click", () => {
    state[c.dataset.f!] = c.dataset.v!;
    $$<HTMLButtonElement>(`[data-f="${c.dataset.f}"]`, rootEl).forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
    apply();
  }));
  const sort = $<HTMLSelectElement>("[data-sort]", rootEl);
  sort?.addEventListener("change", () => {
    const key = sort.value;
    const sorted = [...items].sort((a, b) => key === "short" ? Number(a.dataset.days) - Number(b.dataset.days) : key === "price" ? Number(a.dataset.price) - Number(b.dataset.price) : Number(a.dataset.order) - Number(b.dataset.order));
    sorted.forEach((el) => list.append(el));
  });
  $$("[data-clear]").forEach((b) => b.addEventListener("click", () => {
    $$<HTMLButtonElement>("[data-f]", rootEl).forEach((c) => { const first = c.parentElement!.querySelector<HTMLButtonElement>("[data-f]")!; if (c === first) { state[c.dataset.f!] = c.dataset.v!; } c.setAttribute("aria-pressed", String(c === first)); });
    apply();
  }));
  // A link such as /packages?type=Wildlife opens the list already filtered
  const params = new URLSearchParams(location.search);
  params.forEach((v, k) => { const chip = $<HTMLButtonElement>(`[data-f="${k}"][data-v="${CSS.escape(v)}"]`, rootEl); if (chip) chip.click(); });
  apply();
});

/* Itinerary: open a day, or every day */
(() => {
  const days = $$(".days .day");
  if (!days.length) return;
  const set = (d: HTMLElement, on: boolean) => { d.classList.toggle("open", on); d.querySelector("button")!.setAttribute("aria-expanded", String(on)); };
  days.forEach((d) => d.querySelector("button")!.addEventListener("click", () => set(d, !d.classList.contains("open"))));
  const all = $<HTMLButtonElement>("#openAll");
  all?.addEventListener("click", () => { const open = !days.every((d) => d.classList.contains("open")); days.forEach((d) => set(d, open)); all.textContent = open ? "Close every day" : "Open every day"; });
})();

/* Vehicles: dim what doesn't seat the group */
(() => {
  const chips = $$<HTMLButtonElement>("[data-size]");
  chips.forEach((c) => c.addEventListener("click", () => {
    chips.forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
    const [lo, hi] = c.dataset.size!.split("-").map(Number) as [number, number];
    $$(".vrow").forEach((r) => r.classList.toggle("dim", !(Number(r.dataset.min) <= hi && Number(r.dataset.max) >= lo)));
  }));
})();

/* The film band plays only while on screen, and can be paused */
(() => {
  const v = $<HTMLVideoElement>("#film"), b = $<HTMLButtonElement>("#filmBtn");
  if (!v || !b) return;
  let userPaused = !motion();
  const setBtn = (paused: boolean) => { b.classList.toggle("is-paused", paused); b.querySelector("span")!.textContent = paused ? "Play" : "Pause"; b.setAttribute("aria-label", paused ? "Play the film" : "Pause the film"); };
  const play = () => v.play().then(() => { (v.previousElementSibling as HTMLElement).style.opacity = "0"; setBtn(false); }).catch(() => setBtn(true));
  setBtn(true);
  v.addEventListener("loadedmetadata", () => { try { v.currentTime = 1.2; } catch {} }, { once: true });
  v.addEventListener("ended", () => { try { v.currentTime = 1.2; } catch {} void v.play().catch(() => {}); });
  b.addEventListener("click", () => { if (v.paused) { userPaused = false; void play(); } else { userPaused = true; v.pause(); setBtn(true); } });
  new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !userPaused) void play(); else if (!e.isIntersecting && !v.paused) { v.pause(); setBtn(true); } }), { threshold: 0.35 }).observe(v.closest(".film")!);
})();

/* Trip types: a photo follows the pointer */
(() => {
  const rows = $$<HTMLElement>("[data-follow]");
  const box = $("#follow");
  if (!rows.length || !box || !fine) return;
  const img = box.querySelector("img")!;
  let fx = 0, fy = 0, tx = 0, ty = 0, on = false, raf = 0;
  const step = () => {
    const k = motion() ? 0.18 : 1;
    fx += (tx - fx) * k; fy += (ty - fy) * k;
    const x = fx + 260 > innerWidth ? fx - 258 : fx + 28;
    box.style.transform = `translate3d(${x.toFixed(1)}px, ${Math.min(innerHeight - 300, Math.max(80, fy - 150)).toFixed(1)}px, 0)`;
    if (on || Math.abs(tx - fx) > 0.5 || Math.abs(ty - fy) > 0.5) raf = requestAnimationFrame(step);
  };
  rows.forEach((el) => {
    el.addEventListener("pointerenter", (e) => { if (img.getAttribute("src") !== el.dataset.follow) img.src = el.dataset.follow!; tx = e.clientX; ty = e.clientY; if (!on) { fx = tx; fy = ty; } on = true; box.classList.add("on"); cancelAnimationFrame(raf); step(); });
    el.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; });
    el.addEventListener("pointerleave", () => { on = false; box.classList.remove("on"); });
  });
})();

/* Plan your trip: chips, steppers, and sending the enquiry */
(() => {
  const form = $<HTMLFormElement>("#planForm");
  if (!form) return;
  $$<HTMLButtonElement>("[data-chip]", form).forEach((c) => c.addEventListener("click", () => {
    if (c.dataset.multi !== undefined) c.setAttribute("aria-pressed", String(c.getAttribute("aria-pressed") !== "true"));
    else $$<HTMLButtonElement>(`[data-chip="${c.dataset.chip}"]`, form).forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
  }));
  $$<HTMLButtonElement>("[data-step]", form).forEach((b) => b.addEventListener("click", () => {
    const input = $<HTMLInputElement>(`#${b.dataset.step}`, form)!;
    const min = Number(input.min || 0);
    input.value = String(Math.max(min, Math.min(60, Number(input.value || 0) + Number(b.dataset.d))));
  }));
  const tour = new URLSearchParams(location.search).get("tour");
  const notes = $<HTMLTextAreaElement>("#notes", form);
  if (tour && notes && !notes.value) notes.value = `We are interested in ${tour}.`;
  const err = $("#planErr");
  const chip = (name: string, multi = false) => {
    const on = $$<HTMLButtonElement>(`[data-chip="${name}"][aria-pressed="true"]`, form).map((c) => c.dataset.v!);
    return multi ? on.join(", ") : on[0] || "";
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const v = (id: string) => ($<HTMLInputElement>(`#${id}`, form)?.value || "").trim();
    const btn = $<HTMLButtonElement>("button[type=submit]", form)!;
    btn.disabled = true;
    if (err) err.textContent = "";
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first: v("first"), last: v("last"), email: v("email"), code: v("code"), phone: v("phone"), country: v("country"),
          journey: chip("where") + (tour ? ` · ${tour}` : ""), when: [v("month"), v("year")].filter(Boolean).join(" "),
          duration: chip("length"), adults: v("adults"), children: v("children"), budget: chip("budget"),
          interests: chip("interests", true), notes: v("notes"), website: v("website"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Your enquiry could not be sent.");
      const sent = $("#planSent")!;
      $("#sentName")!.textContent = v("first");
      form.hidden = true;
      sent.hidden = false;
      sent.focus();
    } catch (error) {
      if (err) err.textContent = `${error instanceof Error ? error.message : "Your enquiry could not be sent."} Please try again, or email contact@travedise.com.`;
    } finally {
      btn.disabled = false;
    }
  });
})();

/* Heading-size dials for tuning the type scale: the dev site and local previews only, never travedise.com. */
if (!/(^|\.)travedise\.com$/.test(location.hostname)) import("./type-dials");
