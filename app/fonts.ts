import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";

export const generalSans = localFont({
  src: "./fonts/GeneralSans-Variable.ttf",
  weight: "200 700",
  display: "swap",
  variable: "--font-general-sans",
});

export const boska = localFont({
  src: "./fonts/Boska-Variable.ttf",
  weight: "200 900",
  display: "swap",
  variable: "--font-boska-variable",
});

/** Display face for the v2 home page — Regular (400) and Medium (500). */
export const ltSoul = localFont({
  src: [
    { path: "./fonts/LTSoul-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/LTSoul-Medium.otf", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-lt-soul",
});

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter-tight",
});
