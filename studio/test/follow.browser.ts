import { chromium, type Page } from 'playwright';
import assert from 'node:assert/strict';
import { switchPage } from './pageNavigation';

const browser = await chromium.launch({
  executablePath:
    process.env['CHROME_PATH'] ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const leaderContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const followerContext = await browser.newContext({ viewport: { width: 1440, height: 760 } });
await leaderContext.addInitScript(() => sessionStorage.setItem('studio-name', 'Leader'));
await followerContext.addInitScript(() => sessionStorage.setItem('studio-name', 'Follower'));
const leader = await leaderContext.newPage();
const follower = await followerContext.newPage();
const errors: string[] = [];
for (const page of [leader, follower]) {
  page.on('pageerror', (error) => errors.push(error.message));
}
// Exercise delayed preview startup rather than relying on warm local modules.
await follower.route('**/studio/preview.js', async (route) => {
  await new Promise((resolve) => setTimeout(resolve, 750));
  await route.continue();
});
let previewEntries = 0;
follower.on('request', (request) => {
  if (request.url().includes('/studio/api/preview-url')) {
    previewEntries++;
  }
});
const url = process.env['STUDIO_URL'] ?? 'http://localhost:4389/studio';
try {
  await Promise.all([leader.goto(url), follower.goto(url)]);
  for (const page of [leader, follower]) {
    await page.locator('.save-state').filter({ hasText: 'Saved' }).waitFor();
    await page.frameLocator('iframe[title="Site preview"]').locator('h1').waitFor();
  }
  await leader.getByRole('button', { name: 'Expand all', exact: true }).click();
  await leader
    .locator('.structure-node')
    .filter({ has: leader.locator('.label', { hasText: /^Heading$/ }) })
    .first()
    .click();
  await scroll(follower, 0.45);
  await follower.getByRole('button', { name: 'Follow Leader', exact: true }).click();
  await follower.getByRole('button', { name: 'Stop following Leader', exact: true }).waitFor();
  assert.equal(
    await follower
      .getByRole('button', { name: 'Stop following Leader', exact: true })
      .evaluate((node) => getComputedStyle(node).outlineWidth),
    '2px',
  );
  await aligned(leader, follower);
  assert.equal(
    await follower.locator('.rich-content').count(),
    1,
    'Following shows the leader’s settings read-only',
  );
  assert.equal(
    await follower
      .locator('.studio-right')
      .evaluate((node) => node instanceof HTMLElement && node.inert),
    true,
  );
  await scroll(leader, 0.8);
  await aligned(leader, follower);
  assert.ok((await position(leader)) > 100, 'The page actually scrolled');
  await scroll(leader, 0.15);
  await aligned(leader, follower);
  await switchPage(leader, 'src/pages/404.astro');
  await follower.waitForFunction(
    () =>
      document.querySelector('[aria-label="Current page"]')?.getAttribute('data-file') ===
      'src/pages/404.astro',
  );
  await follower.frameLocator('iframe[title="Site preview"]').locator('h1').waitFor();
  await switchPage(leader, 'src/pages/index.astro');
  await follower.waitForFunction(
    () =>
      document.querySelector('[aria-label="Current page"]')?.getAttribute('data-file') ===
      'src/pages/index.astro',
  );
  await follower.frameLocator('iframe[title="Site preview"]').locator('h1').waitFor();
  await scroll(leader, 0.6);
  await aligned(leader, follower);
  // Replacing the follower frame must retain the live follow subscription.
  assert.equal(
    await follower
      .getByRole('button', { name: 'Stop following Leader', exact: true })
      .getAttribute('aria-pressed'),
    'true',
  );
  await follower.getByTitle('Canvas — all breakpoints — 4', { exact: true }).click();
  await follower.getByTitle('Desktop — 1', { exact: true }).click();
  await aligned(leader, follower);
  await follower.getByRole('button', { name: 'Stop following Leader', exact: true }).click();
  await follower.getByRole('button', { name: 'Follow Leader', exact: true }).waitFor();
  assert.equal(
    await follower
      .getByRole('button', { name: 'Follow Leader', exact: true })
      .evaluate((node) => getComputedStyle(node).outlineStyle),
    'none',
  );
  const stopped = await position(follower);
  await scroll(leader, 0.1);
  await follower.waitForTimeout(250);
  assert.ok(
    Math.abs((await position(follower)) - stopped) < 2,
    'Stopping follow leaves the follower viewport alone',
  );
  await switchPage(leader, 'src/pages/404.astro');
  await follower.waitForTimeout(250);
  assert.equal(
    await follower.getByLabel('Current page', { exact: true }).getAttribute('data-file'),
    'src/pages/index.astro',
  );
  assert.equal(previewEntries, 1, 'Page switches reuse the established preview session');
  assert.deepEqual(errors, []);
  console.log(
    'Continuous avatar following tracks scrolling, page changes and frame replacement without claiming selection; clicking again stops following.',
  );
} finally {
  await browser.close();
}

async function scroll(page: Page, fraction: number) {
  await page
    .frameLocator('iframe[title="Site preview"]')
    .locator('html')
    .evaluate((root, value) => {
      window.scrollTo({
        top: value * Math.max(0, root.scrollHeight - innerHeight),
        behavior: 'instant',
      });
    }, fraction);
}
async function position(page: Page) {
  return page
    .frameLocator('iframe[title="Site preview"]')
    .locator('html')
    .evaluate(() => scrollY);
}
async function aligned(leader: Page, follower: Page) {
  const expected = await position(leader);
  for (let attempt = 0; attempt < 100; attempt++) {
    if (Math.abs((await position(follower)) - expected) < 2) {
      return;
    }
    await follower.waitForTimeout(50);
  }
  assert.fail(
    'Follower did not match scroll: ' + (await position(follower)) + ', expected ' + expected,
  );
}
