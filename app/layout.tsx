import type { Metadata } from "next";

import "./globals.css";
import { interTight, ragmont } from "./fonts";

import { AgentationToolbar } from "@/components/agentation-toolbar";
import { InterfaceKitPanel } from "@/components/interface-kit-panel";
import { WebMcpTools } from "@/components/site/webmcp-tools";
import { jsonLdScript, siteJsonLd } from "@/lib/structured-data";

const FAVICON = "/assets/6a3375a38fce14ddb37ecc20_69e71a6f589fe83624cd3faf_travedise-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://travedise.com"),
  title: {
    default: "Travedise - Your Next Adventure Starts Here",
    template: "%s",
  },
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
};

const TAWK = `(function(){
  function load(){
    if (window.__tawkLoaded) return;
    window.__tawkLoaded = true;
    var Tawk_API=window.Tawk_API||{}, Tawk_LoadStart=new Date();
    window.Tawk_API=Tawk_API;
    window.Tawk_LoadStart=Tawk_LoadStart;
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/6a8bd90e5d2e283449285f96/1k0p4foar';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
  }
  if ('requestIdleCallback' in window) requestIdleCallback(load, {timeout: 5000});
  else setTimeout(load, 3000);
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      <body
        className={`${interTight.variable} ${ragmont.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(siteJsonLd) }}
        />
        {children}
        <WebMcpTools />
        <AgentationToolbar />
        <InterfaceKitPanel />
      </body>
    </html>
  );
}
