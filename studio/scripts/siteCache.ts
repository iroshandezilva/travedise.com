import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

// travedise: the site uses pnpm, so the image caches pnpm-lock.yaml (and the workspace file
// that holds pnpm's build settings) as well as Stacki's original package-lock.json support.
export const SITE_LOCKFILES = ['pnpm-lock.yaml', 'package-lock.json'] as const;
const EXTRA_MANIFESTS = ['pnpm-workspace.yaml'];

// Docker receives only dependency manifests, never local site drafts or credentials.
export async function prepareSiteCache() {
  const root = path.resolve(process.env['STUDIO_PROJECT_ROOT'] ?? '..');
  const destination = '.studio-image/site';
  await mkdir(destination, { recursive: true });
  for (const file of [...SITE_LOCKFILES, ...EXTRA_MANIFESTS]) {
    await rm(path.join(destination, file), { force: true });
  }
  const lockfile = await firstExisting(root, SITE_LOCKFILES);
  if (!lockfile) {
    await writeFile(path.join(destination, 'package.json'), '{"private":true}');
    return;
  }
  await copyFile(path.join(root, 'package.json'), path.join(destination, 'package.json'));
  await copyFile(path.join(root, lockfile), path.join(destination, lockfile));
  for (const file of EXTRA_MANIFESTS) {
    if (await exists(path.join(root, file))) {
      await copyFile(path.join(root, file), path.join(destination, file));
    }
  }
}

export async function firstExisting(root: string, files: readonly string[]) {
  for (const file of files) {
    if (await exists(path.join(root, file))) {
      return file;
    }
  }
  return undefined;
}

async function exists(file: string) {
  try {
    await readFile(file);
    return true;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}
