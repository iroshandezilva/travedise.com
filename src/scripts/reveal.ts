/**
 * Shows every `[data-reveal]` element the first time it scrolls into view, by setting
 * `data-shown`. The animation itself is CSS — see `[data-reveal]` in global.css.
 */
const pending = new Set<Element>();

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) show(entry.target);
    }
    // An element only reports as intersecting if the observer samples it while it is on
    // screen. Jump past one — an anchor link, a restored scroll position, a fast drag of
    // the scrollbar — and it goes from below the fold to overhead between two samples,
    // crosses no threshold, and is never reported at all: it would sit at opacity 0 for
    // good. So on every callback, take in anything that is now above the viewport too.
    for (const el of pending) {
      if (el.getBoundingClientRect().bottom < 0) show(el);
    }
  },
  // Webflow fires when the element is 10% into the viewport.
  { rootMargin: "0px 0px -10% 0px" },
);

function show(el: Element) {
  el.setAttribute("data-shown", "");
  pending.delete(el);
  observer.unobserve(el);
}

for (const el of document.querySelectorAll("[data-reveal]:not([data-shown])")) {
  pending.add(el);
  observer.observe(el);
}
