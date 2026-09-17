import type { Metadata } from "next";

import "./globals.css";
import { boska, generalSans, interTight } from "./fonts";

import { AgentationToolbar } from "@/components/agentation-toolbar";
import { InterfaceKitPanel } from "@/components/interface-kit-panel";

const FAVICON = "/assets/6a3375a38fce14ddb37ecc20_69e71a6f589fe83624cd3faf_travedise-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://travedise.com"),
  title: {
    default: "Travedise - Your Next Adventure Starts Here",
    template: "%s",
  },
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  generator: "Webflow",
};

/**
 * Webflow tags <html> with `w-mod-js` / `w-mod-touch` before first paint (the
 * stylesheet keys `background-attachment` off `w-mod-touch`), IX2 adds
 * `w-mod-ix`, and the font loader adds its own `wf-*` classes — all before
 * React hydrates. Hydration clears the attribute wholesale, so this restores
 * the last good value; a deliberate change by Webflow never empties it.
 */
const WF_MOD = `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch");var last=n.className,tries=0;new MutationObserver(function(){n.className?last=n.className:tries++<5&&(n.className=last)}).observe(n,{attributes:!0,attributeFilter:["class"]})}(window,document);`;

const WEBFONT = `WebFont.load({  google: {    families: ["Oswald:200,300,400,500,600,700","Inter Tight:300,400,500,600,700"]  }});`;

const TAWK = `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a8bd90e5d2e283449285f96/1k0p4foar';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-wf-domain="travedise.com"
      data-wf-site="69c38c8fa6a389dfc5835058"
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <script src="/js/webfont.js" type="text/javascript" />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: WEBFONT }} />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: WF_MOD }} />

        <link href={FAVICON} rel="icon" type="image/png" sizes="32x32" />
        <link
          href="/assets/6a3375a3e1977d34c6b33475_69e71a6f589fe83624cd3faf_travedise-logo.png"
          rel="icon"
          type="image/png"
          sizes="48x48"
        />
        <link
          href="/assets/6a3375a3576c9849d0332f6b_69e71a6f589fe83624cd3faf_travedise-logo.png"
          rel="icon"
          type="image/png"
          sizes="192x192"
        />
        <link
          href="/assets/6a3375a31e3fd9ef9da7e4ff_69e71a6f589fe83624cd3faf_travedise-logo.png"
          rel="icon"
          type="image/png"
          sizes="512x512"
        />
        <link
          href="/assets/6a3375a351ef67e160de31e4_69e71a6f589fe83624cd3faf_travedise-logo.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />

        {/* Live chat is production-only — no support widget in local dev. */}
        {process.env.NODE_ENV === "production" && (
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: TAWK }} />
        )}
      </head>
      <body className={`${generalSans.variable} ${interTight.variable} ${boska.variable}`}>
        {children}
        <AgentationToolbar />
        <InterfaceKitPanel />
      </body>
    </html>
  );
}
