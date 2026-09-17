/**
 * Cloudflare Pages middleware (runs only for page routes — see public/_routes.json).
 *
 * - Markdown for agents: `Accept: text/markdown` returns the page's Markdown twin
 *   (generated into out/ by scripts/agent-files.mjs); browsers keep getting HTML.
 * - Discovery: `Link` headers (RFC 8288) pointing agents at machine-readable resources.
 */

const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=no";

const HOME_LINKS = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/ai-catalog.json>; rel="describedby"; type="application/json"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
];

const markdownPath = (pathname) =>
  pathname === "/" ? "/index.md" : `${pathname.replace(/\/+$/, "")}.md`;

export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);
  const accept = request.headers.get("Accept") ?? "";

  if (/\btext\/markdown\b/i.test(accept) && ["GET", "HEAD"].includes(request.method)) {
    const asset = await env.ASSETS.fetch(new URL(markdownPath(url.pathname), url));
    if (asset.ok) {
      const body = await asset.text();
      return new Response(request.method === "HEAD" ? null : body, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=0, must-revalidate",
          Vary: "Accept",
          // Rough estimate (~4 characters per token), as Cloudflare's own converter reports.
          "x-markdown-tokens": String(Math.ceil(body.length / 4)),
          "Content-Signal": CONTENT_SIGNAL,
          Link: `<${url.pathname}>; rel="canonical"; type="text/html"`,
        },
      });
    }
  }

  const response = await next();
  if (!(response.headers.get("Content-Type") ?? "").includes("text/html")) return response;

  const headers = new Headers(response.headers);
  headers.append("Vary", "Accept");
  headers.set("Content-Signal", CONTENT_SIGNAL);
  headers.append("Link", `<${markdownPath(url.pathname)}>; rel="alternate"; type="text/markdown"`);
  if (url.pathname === "/") HOME_LINKS.forEach((link) => headers.append("Link", link));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
