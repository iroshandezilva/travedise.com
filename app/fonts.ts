import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";

/**
 * Display face for the v2 pages — Ragmont, a variable font with weight and width axes.
 * The italic is its own file; a few lines set one word in it.
 */
export const ragmont = localFont({
  src: [
    { path: "./fonts/Ragmont-Variable.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/Ragmont-Variable-Italic.woff2", weight: "100 900", style: "italic" },
  ],
  declarations: [{ prop: "font-stretch", value: "75% 150%" }],
  display: "swap",
  variable: "--font-ragmont",
});

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter-tight",
});
