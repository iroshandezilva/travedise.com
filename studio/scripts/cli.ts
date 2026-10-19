import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cp, mkdir, access } from 'node:fs/promises';
import { startDraft } from './dev';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const command = process.argv[2];
if (command === 'dev') {
  const project = path.resolve(process.argv[3] ?? process.env['STUDIO_PROJECT'] ?? '.');
  const port = Number(process.env['PORT'] ?? 4350);
  if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    throw new Error('PORT must be between 1024 and 65535');
  }
  await startDraft(packageRoot, project, port);
} else if (command === 'init-cloudflare') {
  const destination = path.resolve(process.argv[3] ?? 'studio-cloudflare');
  let existing = false;
  try {
    await access(destination);
    existing = true;
  } catch {
    /* A new directory is required. */
  }
  if (existing) {
    throw new Error('Choose a new deployment directory; existing files will not be overwritten');
  }
  await mkdir(destination, { recursive: true });
  for (const file of [
    'package.json',
    'Dockerfile',
    '.dockerignore',
    'cloudflare',
    'src',
    'scripts',
    'vendor',
    'tsconfig.json',
    'LICENSE',
  ]) {
    await cp(path.join(packageRoot, file), path.join(destination, file), { recursive: true });
  }
  console.log(
    `Cloudflare deployment template created in ${destination}. Configure cloudflare/wrangler.jsonc and secrets using the deployment guide.`,
  );
} else {
  console.log(
    'Astro Studio\n\n  astro-studio dev [project-directory]\n  astro-studio init-cloudflare [new-directory]\n\nPORT overrides 4350. STUDIO_WORKSPACE selects the draft workspace.',
  );
}
