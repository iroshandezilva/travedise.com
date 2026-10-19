// Fixed categories and bounded response headers only: never log request URLs,
// authorization codes, cookies, tokens, usernames, or response bodies.
export function githubDiagnostic(
  kind: 'installation-token' | 'repository' | 'sign-in-token' | 'profile',
  response: Response,
  started: number,
) {
  const headers = [
    'x-github-request-id',
    'retry-after',
    'x-ratelimit-resource',
    'x-ratelimit-limit',
    'x-ratelimit-remaining',
    'x-ratelimit-used',
    'x-ratelimit-reset',
    'server',
    'cf-ray',
    'cf-mitigated',
  ];
  console.info('GitHub request', {
    kind,
    status: response.status,
    durationMs: Math.max(0, Date.now() - started),
    redirected: response.redirected,
    ...Object.fromEntries(
      headers.map((name) => [
        name,
        (response.headers.get(name) ?? '').replace(/[^a-zA-Z0-9:;=., /_-]/g, '').slice(0, 120),
      ]),
    ),
  });
}
