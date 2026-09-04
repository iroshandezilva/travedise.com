"use client";

import { useEffect } from "react";

export type ScriptSpec = { src: string } | { inline: string };

/**
 * Webflow's runtime is a chain of classic scripts that must execute in source
 * order (jQuery -> shared chunks -> the page's feature bundle -> GSAP).
 *
 * They also mutate the DOM heavily on startup — IX2 writes the initial state of
 * every page-load interaction as inline styles — so they have to run *after*
 * React has hydrated; otherwise hydration reverts those styles and every
 * collapsed FAQ, staged animation and hidden image springs open. Loading them
 * one at a time keeps the order, and `IX2_PAGE_UPDATE` (Webflow's own hook for
 * client-side page changes) replays the page-load triggers that already fired.
 */
export function WebflowScripts({ pageId, scripts }: { pageId: string; scripts: ScriptSpec[] }) {
  useEffect(() => {
    // IX2 addresses interaction targets as `<data-wf-page>|<data-w-id>`, so the
    // page id has to be on <html> before the runtime boots. It cannot come from
    // the shared root layout, and React strips attributes it did not render
    // from <html> while hydrating — setting it here is after both.
    document.documentElement.setAttribute("data-wf-page", pageId);

    const injected: HTMLScriptElement[] = [];
    let cancelled = false;

    const load = (script: ScriptSpec) =>
      new Promise<void>((resolve) => {
        const el = document.createElement("script");
        el.type = "text/javascript";
        injected.push(el);

        if ("inline" in script) {
          el.textContent = script.inline;
          document.body.appendChild(el); // inline scripts run synchronously
          resolve();
          return;
        }
        el.src = script.src;
        el.async = false;
        el.addEventListener("load", () => resolve());
        el.addEventListener("error", () => resolve());
        document.body.appendChild(el);
      });

    void (async () => {
      for (const script of scripts) {
        if (cancelled) return;
        await load(script);
      }
      if (!cancelled) document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    })();

    return () => {
      cancelled = true;
      injected.forEach((el) => el.remove());
    };
  }, [pageId, scripts]);

  return null;
}
