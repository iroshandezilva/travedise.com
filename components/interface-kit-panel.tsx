"use client";

import dynamic from "next/dynamic";

// `NODE_ENV` is inlined at build time, so a production build drops the branch —
// and with it the dynamic import — keeping the panel out of the bundle entirely.
const InterfaceKit =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("interface-kit/react").then((m) => m.InterfaceKit), { ssr: false })
    : () => null;

/** Dev-only visual styling tool: restyle elements in the browser and read the changes back. */
export function InterfaceKitPanel() {
  return <InterfaceKit />;
}
