import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath:
    process.env['CHROME_PATH'] ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const url = process.env['STUDIO_URL'] ?? 'http://localhost:4389/studio';
let release = () => {};
const gate = new Promise<void>((resolve) => {
  release = resolve;
});
await page.route('**/studio/morph.js', async (route) => {
  await gate;
  await route.continue();
});
let renders = 0;
page.on('websocket', (socket) =>
  socket.on('framereceived', (frame) => {
    if (String(frame.payload).includes('"event":"studio:render"')) {
      renders++;
    }
  }),
);
let duplicated = false;
try {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator('.save-state').filter({ hasText: 'Saved' }).waitFor();
  await page.getByRole('button', { name: 'Expand all', exact: true }).click();
  const row = page
    .locator('.structure-node')
    .filter({ has: page.locator('.label', { hasText: /^Heading$/ }) });
  await row.click();
  const before = renders;
  await page.keyboard.press('Meta+d');
  duplicated = true;
  await row.nth(1).waitFor();
  for (let attempt = 0; attempt < 100 && renders <= before; attempt++) {
    await page.waitForTimeout(20);
  }
  assert.ok(renders > before, 'Authoritative render arrives while morph startup is delayed');
  const released = performance.now();
  release();
  const headings = page
    .frameLocator('iframe[title="Site preview"]')
    .getByRole('heading', { name: 'Style Guide', exact: true });
  await headings.nth(1).waitFor({ timeout: 1000 });
  assert.ok(
    performance.now() - released < 1000,
    'Buffered rendering is replayed without fallback polling',
  );
  await page.keyboard.press('Meta+z');
  await headings.nth(1).waitFor({ state: 'detached' });
  duplicated = false;
  console.log(
    'A duplicate made before the preview renderer loads appears immediately when it becomes ready; undo updates live.',
  );
} finally {
  release();
  if (duplicated) {
    await page.keyboard.press('Meta+z');
    await page.waitForTimeout(300);
  }
  await browser.close();
}
