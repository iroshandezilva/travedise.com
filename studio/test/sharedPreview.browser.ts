import { chromium, type Page } from 'playwright';
import assert from 'node:assert/strict';
import { record, string } from '../src/shared/validation';
import { switchPage } from './pageNavigation';

const browser = await chromium.launch({
  executablePath:
    process.env['CHROME_PATH'] ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const url = process.env['STUDIO_URL'] ?? 'http://127.0.0.1:4389/studio';
const pages = await Promise.all([
  browser.newPage({ viewport: { width: 1440, height: 1000 } }),
  browser.newPage({ viewport: { width: 1440, height: 1000 } }),
]);
const first = pages[0];
assert.ok(first);
let held = false;
const release: (() => void)[] = [];
const errors: string[] = [];
let releaseFetch = () => {};
const fetchGate = new Promise<void>((resolve) => {
  releaseFetch = resolve;
});
for (const page of pages) {
  await page.route('**/*', async (route) => {
    if (
      held &&
      route.request().resourceType() === 'fetch' &&
      new URL(route.request().url()).pathname === '/'
    ) {
      await fetchGate;
    }
    await route.continue();
  });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.routeWebSocket('**/*', (socket) => {
    const server = socket.connectToServer();
    server.onMessage((message) => {
      if (held && String(message).includes('"event":"studio:render"')) {
        release.push(() => socket.send(message));
      } else {
        socket.send(message);
      }
    });
  });
}
let original: string | undefined;
try {
  await Promise.all(pages.map((page) => page.goto(url)));
  for (const page of pages) {
    await page.locator('.save-state').filter({ hasText: 'Saved' }).waitFor();
    await canvas(page).locator('h1').waitFor();
    await page.getByRole('button', { name: 'Expand all', exact: true }).click();
  }
  original = await source();
  await first.waitForTimeout(500);
  held = true;
  await row('Heading').click();
  let start = Date.now();
  await first.locator('.rich-content').fill('Shared immediate heading');
  for (const page of pages) {
    await canvas(page)
      .getByRole('heading', { name: 'Shared immediate heading', exact: true })
      .waitFor({ timeout: 1500 });
  }
  const text = Date.now() - start;
  await row('Heading').click();
  start = Date.now();
  await first.keyboard.press('Meta+d');
  for (const page of pages) {
    await canvas(page).locator('h1').nth(1).waitFor({ timeout: 1500 });
  }
  const duplicate = Date.now() - start;
  await first.locator('.save-state').filter({ hasText: 'Saved' }).waitFor();
  start = Date.now();
  await first.keyboard.press('Backspace');
  for (const page of pages) {
    await canvas(page).locator('h1').nth(1).waitFor({ state: 'detached', timeout: 1500 });
  }
  const deleted = Date.now() - start;
  await row('Heading').click();
  start = Date.now();
  await first.evaluate(() => {
    const source = document.querySelector('.structure-node.selected');
    const target = document.querySelector(
      '.nav-gap[data-drop-parent="n0.0.0"][data-drop-index="3"]',
    );
    if (!source || !target) {
      throw new Error('Missing drag endpoints');
    }
    const dataTransfer = new DataTransfer();
    source.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer }));
    target.dispatchEvent(
      new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer }),
    );
    target.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer }));
    source.dispatchEvent(new DragEvent('dragend', { bubbles: true, dataTransfer }));
  });
  for (const page of pages) {
    await page
      .frame({ url: /#avb-design$/ })
      ?.waitForFunction(
        () => document.querySelector('h1')?.previousElementSibling?.textContent?.includes('v1.0.0'),
        undefined,
        { timeout: 1500 },
      );
  }
  const moved = Date.now() - start;
  await row('ContentWrapper').click();
  await first.keyboard.press('Meta+f');
  const palette = first.locator('.insert-palette');
  await palette.getByPlaceholder('Search components, elements…').fill('Heading');
  start = Date.now();
  await palette
    .locator('.insert-item')
    .filter({ has: first.locator('.insert-item-label', { hasText: /^Heading$/ }) })
    .click();
  for (const page of pages) {
    await canvas(page)
      .getByText('Lorem ipsum dolor sit amet elit', { exact: true })
      .waitFor({ timeout: 1500 });
  }
  const inserted = Date.now() - start;
  assert.ok(release.length > 0, 'Authoritative renders were withheld throughout the edit checks');
  held = false;
  releaseFetch();
  for (const send of release.splice(0)) {
    send();
  }
  await first.locator('.save-state').filter({ hasText: 'Saved' }).waitFor();
  await first.waitForTimeout(300);
  // Return navigation must preserve the iframe, its document and initialized scripts.
  await canvas(first)
    .locator('html')
    .evaluate(() => Object.defineProperty(document, 'retainedPreview', { value: true }));
  await switchPage(first, 'src/pages/404.astro');
  await first.waitForFunction(
    () =>
      document.querySelector('[aria-label="Current page"]')?.getAttribute('data-file') ===
      'src/pages/404.astro',
  );
  await canvas(first).locator('h1').waitFor();
  await switchPage(first, 'src/pages/index.astro');
  await first.waitForFunction(
    () =>
      document.querySelector('[aria-label="Current page"]')?.getAttribute('data-file') ===
      'src/pages/index.astro',
  );
  await first.locator('.preview-frame-wrap[data-preview-loading="false"]').waitFor();
  assert.equal(
    await canvas(first)
      .locator('html')
      .evaluate(() => Reflect.get(document, 'retainedPreview') === true),
    true,
  );
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify({
      text,
      duplicate,
      deleted,
      moved,
      inserted,
      bothEditorsBeforeRender: true,
      retainedPage: true,
    }),
  );
} finally {
  held = false;
  releaseFetch();
  for (const send of release.splice(0)) {
    send();
  }
  if (original !== undefined) {
    const base = await source();
    const response = await first.request.post(new URL('/studio/api/source', url).href, {
      headers: { Origin: new URL(url).origin },
      data: { file: 'src/pages/index.astro', source: original, base },
    });
    assert.ok(response.ok());
  }
  await browser.close();
}
function canvas(page: Page) {
  return page.frameLocator('iframe[title="Site preview"]');
}
function row(name: string) {
  assert.ok(first);
  return first
    .locator('.structure-node')
    .filter({ has: first.locator('.label', { hasText: new RegExp(`^${name}$`) }) })
    .first();
}
async function source() {
  assert.ok(first);
  return string(
    record(
      await (
        await first.request.get(new URL('/studio/api/file?file=src/pages/index.astro', url).href)
      ).json(),
    )['source'],
  );
}
