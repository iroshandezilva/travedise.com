/**
 * travedise.com/studio → the Stacki Studio editor Worker (see docs/cms.md).
 *
 * The site stays on Cloudflare Pages; only /studio and /studio/* are handed to the editor,
 * through a Pages service binding named STUDIO (Pages project → Settings → Bindings →
 * Service binding → Worker `stacki-studio-editor`, production only). The request is passed on
 * unchanged so the editor sees the public origin, sign-in cookies and WebSocket upgrades.
 * Sign-in and access checks happen inside the editor Worker, not here.
 */
export const studioUnavailable = () =>
  new Response("The editor is not available yet. Its hosting setup is still in progress.", {
    status: 503,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });

export function onRequest({ request, env }) {
  return env.STUDIO ? env.STUDIO.fetch(request) : studioUnavailable();
}
