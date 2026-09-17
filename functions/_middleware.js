/**
 * Cloudflare Pages middleware (runs only for page routes — see public/_routes.json).
 *
 * - Markdown for agents: `Accept: text/markdown` returns the page's Markdown twin
 *   (generated into out/ by scripts/agent-files.mjs); browsers keep getting HTML.
 *   Unknown pages get a 404 with a Markdown body pointing at the site index.
 * - Discovery: `Link` headers (RFC 8288) pointing agents at machine-readable resources.
 */

const SITE = "https://travedise.com";
const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=no";

const HOME_LINKS = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/ai-catalog.json>; rel="describedby"; type="application/json"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
];

export const markdownPath = (pathname) =>
  pathname === "/" ? "/index.md" : `${pathname.replace(/\/+$/, "")}.md`;

export const wantsMarkdown = (request) =>
  /\btext\/markdown\b/i.test(request.headers.get("Accept") ?? "") &&
  ["GET", "HEAD"].includes(request.method);

export function notFoundMarkdown(pathname) {
  return `# Page not found (404)

There is no page at \`${pathname}\` on travedise.com. It may have moved, or the address may be mistyped.

- [Site index for agents (llms.txt)](${SITE}/llms.txt) — every page with a Markdown version
- [Sitemap](${SITE}/sitemap.xml)
- [Tour packages](${SITE}/packages.md)
- [Contact Travedise](${SITE}/contact.md)
`;
}

function markdownResponse(request, body, { status = 200, canonical } = {}) {
  const headers = {
    "Content-Type": "text/markdown; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate",
    Vary: "Accept",
    // Rough estimate (~4 characters per token), as Cloudflare's own converter reports.
    "x-markdown-tokens": String(Math.ceil(body.length / 4)),
    "Content-Signal": CONTENT_SIGNAL,
  };
  if (canonical) headers.Link = `<${canonical}>; rel="canonical"; type="text/html"`;
  return new Response(request.method === "HEAD" ? null : body, { status, headers });
}

export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);

  if (wantsMarkdown(request)) {
    const asset = await env.ASSETS.fetch(new URL(markdownPath(url.pathname), url));
    if (asset.ok) {
      return markdownResponse(request, await asset.text(), { canonical: url.pathname });
    }
    if (asset.status === 404) {
      return markdownResponse(request, notFoundMarkdown(url.pathname), { status: 404 });
    }
  }

  const response = await next();
  if (!(response.headers.get("Content-Type") ?? "").includes("text/html")) return response;

  const headers = new Headers(response.headers);
  headers.append("Vary", "Accept");
  headers.set("Content-Signal", CONTENT_SIGNAL);
  if (response.ok) {
    headers.append(
      "Link",
      `<${markdownPath(url.pathname)}>; rel="alternate"; type="text/markdown"`,
    );
  }
  if (url.pathname === "/") HOME_LINKS.forEach((link) => headers.append("Link", link));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
