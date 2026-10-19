export class GitHubChangedError extends Error {
  constructor() {
    super('GitHub advanced during publishing. Refreshing the latest revision is required.');
  }
}
export class GitHubRequestError extends Error {
  constructor(
    readonly status: number,
    readonly retryAt = 0,
  ) {
    super(
      retryAt > Date.now()
        ? `GitHub requests are paused until ${new Date(retryAt).toISOString()} because GitHub requested a cooldown.`
        : `GitHub request failed (${status}); check app permissions and repository access.`,
    );
  }
}
