"use client";

import { useState } from "react";

const PILL =
  "flex h-11 cursor-pointer items-center rounded-full border border-v2-navy/20 bg-transparent px-[18px] text-[14px] text-v2-navy transition-colors duration-150 hover:border-v2-navy/45";

/** Copy link, email and WhatsApp, for the note at `url`. */
export function ShareLinks({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(`${title} ${url}`);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className={PILL}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
          } catch {
            // Clipboard can be blocked (insecure origin, denied permission); the other
            // two options still work.
          }
        }}
      >
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
      <a
        className={PILL}
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
      >
        Email
      </a>
      <a className={PILL} href={`https://wa.me/?text=${text}`} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </div>
  );
}
