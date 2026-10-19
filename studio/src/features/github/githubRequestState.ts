import { createHash } from 'node:crypto';
import { record, string } from '../../shared/validation';
import { retryAt } from '../auth/githubRateLimit';
import { GitHubRequestError } from './githubErrors';
import type { GitHubConfig } from './github';

interface InstallationToken {
  readonly value: string;
  readonly expires: number;
}
export interface GitHubRequestState {
  token: InstallationToken | undefined;
  pending: Promise<string> | undefined;
  blockedUntil: number;
}

// Share across short-lived permission-check clients in one Worker/process. Separate
// transports isolate test clients; credential and repository changes isolate tokens.
export const githubTransport: typeof fetch = (...args) => fetch(...args);
const transports = new WeakMap<typeof fetch, Map<string, GitHubRequestState>>();

export function githubRequestState(config: GitHubConfig, transport: typeof fetch) {
  let states = transports.get(transport);
  if (!states) {
    states = new Map();
    transports.set(transport, states);
  }
  const key = createHash('sha256')
    .update(
      JSON.stringify([config.appId, config.installationId, config.repository, config.privateKey]),
    )
    .digest('hex');
  const existing = states.get(key);
  if (existing) {
    return existing;
  }
  if (states.size >= 64) {
    const oldest = states.keys().next().value;
    if (oldest !== undefined) {
      states.delete(oldest);
    }
  }
  const state: GitHubRequestState = { token: undefined, pending: undefined, blockedUntil: 0 };
  states.set(key, state);
  return state;
}

export function allowGitHubRequest(state: GitHubRequestState) {
  if (state.blockedUntil > Date.now()) {
    throw new GitHubRequestError(429, state.blockedUntil);
  }
}

export async function installationToken(
  state: GitHubRequestState,
  load: () => Promise<unknown>,
): Promise<string> {
  allowGitHubRequest(state);
  if (state.token && state.token.expires - 60_000 > Date.now()) {
    return state.token.value;
  }
  if (state.pending) {
    return state.pending;
  }
  // Coalesce concurrent requests, and refresh before GitHub's actual expiry.
  const pending = load().then((value) => {
    const data = record(value);
    const token = string(data['token'], 500);
    const expires = Date.parse(string(data['expires_at'], 100));
    if (!Number.isFinite(expires) || expires <= Date.now()) {
      throw new Error('GitHub returned an expired or invalid installation token');
    }
    state.token = { value: token, expires };
    return token;
  });
  state.pending = pending;
  try {
    return await pending;
  } finally {
    state.pending = undefined;
  }
}

export function githubRequestFailure(state: GitHubRequestState, response: Response, token: string) {
  if (response.status === 401 && state.token?.value === token) {
    state.token = undefined;
  }
  const limited =
    response.status === 429 ||
    (response.status === 403 &&
      (response.headers.has('Retry-After') ||
        response.headers.get('x-ratelimit-remaining') === '0'));
  if (limited) {
    state.blockedUntil = Math.max(state.blockedUntil, retryAt(response.headers));
  }
  return new GitHubRequestError(response.status, limited ? state.blockedUntil : 0);
}
