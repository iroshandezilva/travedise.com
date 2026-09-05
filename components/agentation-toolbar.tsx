"use client";

import dynamic from "next/dynamic";

// `NODE_ENV` is inlined at build time, so a production build drops the branch —
// and with it the dynamic import — leaving the toolbar out of the bundle
// entirely. It is a devDependency and has no business shipping.
const Agentation =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("agentation").then((m) => m.Agentation), { ssr: false })
    : () => null;

/** Dev-only visual annotation toolbar: click an element, note it, hand the selector to an agent. */
export function AgentationToolbar() {
  return <Agentation />;
}
