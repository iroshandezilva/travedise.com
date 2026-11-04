# Astro Studio engineering rules

This CMS follows Stacki's priorities: safety, performance, then developer experience.

## Setup and hosting

- Read the root SETUP.md before configuring an installation. Use the new owner's accounts, repository, GitHub App, domains, and budget. This template grants no access to an existing deployment.
- Keep personal deployment settings in ignored local configurations and credentials in secret stores. Never commit private keys, tokens, billing contacts, browser sessions, or local environment files.
- The template intentionally sets EDITOR_ACCESS to github: anyone who completes GitHub sign-in can edit and publish that installation's shared website. Explain this behavior and preserve the owner's requested access mode.
- Cloudflare budget alerts are notifications, not spending caps. Follow the owner's authorization for paid services and verify any configured alert before reporting it as active.

## Engineering

- All authored application code, tooling, and tests use TypeScript. Generated JavaScript is build output.
- Organize application capabilities in `src/features/<feature>/`. Keep transport/bootstrap in
  `src/server`, composition in `src/app`, and small cross-feature boundaries in `src/shared`.
- Preserve Astro source outside an explicitly edited range. Never regenerate whole pages from a tree.
- Keep shared drafts distinct from published revisions. A failed build must not change the live site.
- Use strict TypeScript, readonly contracts, discriminated unions, and exhaustive handling.
- No `any`, unchecked casts of external data, non-null assertions, `enum`, or `@ts-ignore`.
- Validate network, filesystem, browser-message, environment, and JSON boundaries. Bound request
  sizes, source sizes, project scans, retries, queues, and AI context/output.
- Prefer expected failures as typed results in the domain layer. Catch errors at transport boundaries.
- Keep functions at most 70 nonblank, noncomment lines. Type-aware ESLint enforces unsafe-value checks, readonly private references, exhaustive unions, and React hook rules. Split UI sections and feature responsibilities, not arbitrary slices.
- Preserve comments explaining why non-obvious decisions exist. Document new runtime dependencies.
- Use real source-round-trip, collaboration, security, and browser tests. Do not substitute mock
  success responses for working integrations. External setup must be explicitly reported as unverified.
- `vendor/stacki` contains attributed upstream code. Keep its provenance and license. Type-check it,
  but do not reformat upstream code merely to match this repository.
- Before completion, run `npm run verify` and the browser suite against a running draft studio.
- The parent directory is the Astro website; this directory contains the CMS. Do not alter website
  source to make tests pass. Follow the parent AGENTS.md for website changes. Preserve existing lockfile changes.
