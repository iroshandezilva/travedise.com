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

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter-tight",
});
