import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom theme tokens from globals.css; otherwise it reads
// `text-h6` as a color and drops it when a real color (`text-navy`) follows.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["h1", "h2", "h3", "h4", "h5", "h6", "body-lg"],
      radius: ["card", "panel"],
    },
  },
});

/** Join class names; later Tailwind utilities override earlier conflicting ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
