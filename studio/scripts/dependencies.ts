import { readFile, symlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { firstExisting, SITE_LOCKFILES } from './siteCache';

// travedise: compares whichever lockfile the site uses (pnpm-lock.yaml here).
export async function linkImageDependencies(root: string, cached = '/opt/site') {
  try {
    const lockfile = await firstExisting(root, SITE_LOCKFILES);
    if (!lockfile) {
      return false;
    }
    const [site, image] = await Promise.all([
      readFile(path.join(root, lockfile)),
      readFile(path.join(cached, lockfile)),
    ]);
    const digest = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');
    if (digest(site) !== digest(image)) {
      return false;
    }
    await symlink(path.join(cached, 'node_modules'), path.join(root, 'node_modules'), 'dir');
    return true;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

/** The install command for a changed lockfile, run inside the container's draft copy. */
export async function installCommand(root: string): Promise<[string, string[]]> {
  if ((await firstExisting(root, SITE_LOCKFILES)) === 'pnpm-lock.yaml') {
    return [
      'pnpm',
      ['install', '--frozen-lockfile', '--prefer-offline', '--store-dir', '/opt/pnpm-store'],
    ];
  }
  return [
    'npm',
    ['ci', '--prefer-offline', '--no-audit', '--no-fund', '--cache', '/opt/npm-cache'],
  ];
}
