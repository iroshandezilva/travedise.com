let established: { origin: string; until: number } | undefined;

// Only a ready message from the authenticated preview establishes this cache.
// Subsequent pages use its existing HttpOnly cookie and normal server access
// checks, avoiding a token request and redirect for every navigation.
export function rememberPreviewOrigin(origin: string) {
  if (established?.origin !== origin) {
    established = { origin, until: Date.now() + 5 * 60_000 };
  }
}
export function cachedPreviewTarget(page: string) {
  if (!established || established.until <= Date.now()) {
    established = undefined;
    return undefined;
  }
  const url = new URL(page, established.origin);
  if (url.origin !== established.origin) {
    return undefined;
  }
  url.hash = 'avb-design';
  return { url: url.href, origin: established.origin };
}
