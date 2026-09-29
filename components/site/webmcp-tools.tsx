"use client";

import { useEffect } from "react";

import { contactEmail, contactOffices, contactPhones } from "@/content/contact";
import { packages } from "@/content/packages";

type Tool = {
  name: string;
  title?: string;
  description: string;
  inputSchema: object;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<unknown>;
};

type ModelContext = {
  registerTool?: (tool: Tool, options?: { signal?: AbortSignal }) => Promise<void> | void;
  provideContext?: (context: { tools: Tool[] }) => void;
};

const SITE_PATH = /^\/[a-z0-9\-/]*$/;

const tools: Tool[] = [
  {
    name: "list_packages",
    title: "List tour packages",
    description:
      "List Travedise's Sri Lanka tour packages with title, starting price per person, duration and page URL.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () =>
      Object.values(packages).map((p) => ({
        title: p.title.trim(),
        priceAndDuration: p.priceLine,
        url: new URL(p.href, location.origin).href,
        markdown: new URL(`${p.href}.md`, location.origin).href,
      })),
  },
  {
    name: "get_page_markdown",
    title: "Read a page as Markdown",
    description:
      "Get the Markdown content of a travedise.com page, e.g. '/packages/hillcountry' for an itinerary, '/faq' or '/plan-your-trip'.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string", description: "Site path starting with '/'." } },
      required: ["path"],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ path }) => {
      if (typeof path !== "string" || !SITE_PATH.test(path))
        throw new Error("Expected a site path like /faq");
      const md = path === "/" ? "/index.md" : `${path.replace(/\/+$/, "")}.md`;
      const res = await fetch(md, { headers: { Accept: "text/markdown" } });
      if (!res.ok) throw new Error(`No page at ${path}`);
      return res.text();
    },
  },
  {
    name: "get_contact_details",
    title: "Get contact details",
    description:
      "Travedise's email, phone numbers and office addresses. Bookings are made by contacting the team.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () => ({
      email: contactEmail.value,
      phones: contactPhones.numbers.map((n) => `${n.number} ${n.region}`),
      offices: contactOffices.map((o) => ({ name: o.label, address: o.lines.join(" ").trim() })),
      planYourTripPage: new URL("/plan-your-trip", location.origin).href,
    }),
  },
  {
    name: "open_page",
    title: "Open a page",
    description:
      "Navigate the browser to a travedise.com page, e.g. '/packages' or '/plan-your-trip'.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string", description: "Site path starting with '/'." } },
      required: ["path"],
    },
    execute: async ({ path }) => {
      if (typeof path !== "string" || !SITE_PATH.test(path))
        throw new Error("Expected a site path like /packages");
      location.assign(path);
      return { opened: path };
    },
  },
];

/** Exposes read-only site tools to in-browser AI agents via WebMCP, where the browser supports it. */
export function WebMcpTools() {
  useEffect(() => {
    const context = ((navigator as { modelContext?: ModelContext }).modelContext ??
      (document as { modelContext?: ModelContext }).modelContext) as ModelContext | undefined;
    if (!context) return;

    const controller = new AbortController();
    if (context.registerTool) {
      for (const tool of tools) void context.registerTool(tool, { signal: controller.signal });
    } else {
      context.provideContext?.({ tools });
    }
    return () => controller.abort();
  }, []);

  return null;
}
