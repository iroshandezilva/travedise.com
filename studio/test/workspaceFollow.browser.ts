import { chromium, type Page } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({
  executablePath:
    process.env['CHROME_PATH'] ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const leader = await browser.newPage({ viewport: { width: 1440, height: 650 } });
const follower = await browser.newPage({ viewport: { width: 1440, height: 650 } });
await leader.addInitScript(() => sessionStorage.setItem('studio-name', 'Panel Leader'));
await follower.addInitScript(() => sessionStorage.setItem('studio-name', 'Panel Follower'));
const errors: string[] = [];
for (const page of [leader, follower]) {
  page.on('pageerror', (error) => errors.push(error.message));
}
try {
  const url = process.env['STUDIO_URL'] ?? 'http://127.0.0.1:4389/studio';
  await Promise.all([leader.goto(url), follower.goto(url)]);
  for (const page of [leader, follower]) {
    await page.locator('.save-state').filter({ hasText: 'Saved' }).waitFor();
    await page.frameLocator('iframe[title="Site preview"]').locator('h1').waitFor();
  }
  const preview = leader.frameLocator('iframe[title="Site preview"]');
  await preview.locator('h1').click();
  await leader.locator('.rich-content').waitFor();
  await follower.getByRole('button', { name: 'Follow Panel Leader', exact: true }).click();
  await follower.locator('.rich-content').waitFor();
  assert.equal(
    await follower
      .locator('.studio-right')
      .evaluate((node) => node instanceof HTMLElement && node.inert),
    true,
  );
  const selected = await leader.locator('.structure-node.selected').getAttribute('data-node-id');
  await follower.waitForFunction(
    (id) => document.querySelector('.structure-node.selected')?.getAttribute('data-node-id') === id,
    selected,
  );
  await leader.getByRole('button', { name: 'Expand all', exact: true }).click();
  const expandedCount = await leader.locator('.structure-node').count();
  await follower.waitForFunction(
    (count) => document.querySelectorAll('.structure-node').length === count,
    expandedCount,
  );
  const disclosure = leader.locator('.studio-right button[aria-expanded]').first();
  await disclosure.click();
  const expanded = await disclosure.getAttribute('aria-expanded');
  await follower.waitForFunction(
    (value) =>
      document
        .querySelector('.studio-right button[aria-expanded]')
        ?.getAttribute('aria-expanded') === value,
    expanded,
  );
  assert.equal(
    await leader.locator('.collaborator-outline[data-peer="Panel Follower"]').count(),
    0,
    'Observers do not paint editing outlines',
  );
  await leader.getByRole('button', { name: 'Code', exact: true }).click();
  await follower.locator('.code-panel .cm-scroller').waitFor();
  await leader.locator('.code-panel .cm-scroller').waitFor();
  await leader.waitForFunction(() => {
    const node = document.querySelector('.code-panel .cm-scroller');
    return node && node.scrollHeight > node.clientHeight + 100;
  });
  await leader.locator('.code-panel .cm-scroller').evaluate((node) => {
    node.scrollTop = 220;
    node.scrollLeft = 80;
  });
  const sourceScroll = await leader
    .locator('.code-panel .cm-scroller')
    .evaluate((node) => [node.scrollLeft, node.scrollTop]);
  assert.ok((sourceScroll[1] ?? 0) > 100, 'Code panel actually scrolls');
  await follower.waitForFunction((expected) => {
    const node = document.querySelector('.code-panel .cm-scroller');
    return (
      node &&
      Math.abs(node.scrollTop - (expected[1] ?? 0)) < 2 &&
      Math.abs(node.scrollLeft - (expected[0] ?? 0)) < 2
    );
  }, sourceScroll);
  // Exercise arbitrary nested overflow containers, including returning both axes to zero.
  for (const page of [leader, follower]) {
    await nestedScrollers(page);
  }
  await leader.locator('[data-scroll-test="outer"]').evaluate((node) => node.scrollTo(75, 90));
  await leader.locator('[data-scroll-test="inner"]').evaluate((node) => node.scrollTo(130, 160));
  await assertNested(follower, [75, 90, 130, 160]);
  await leader.locator('[data-scroll-test="outer"]').evaluate((node) => node.scrollTo(0, 0));
  await leader.locator('[data-scroll-test="inner"]').evaluate((node) => node.scrollTo(0, 0));
  await assertNested(follower, [0, 0, 0, 0]);
  await leader.getByRole('button', { name: 'Components', exact: true }).click();
  await follower.waitForFunction(
    () =>
      document.querySelector('button[aria-label="Components"]')?.getAttribute('aria-pressed') ===
      'true',
  );
  await leader.locator('.studio-left').hover({ position: { x: 120, y: 120 } });
  const cursor = follower.locator(
    '#studio-live-cursors .collaborator-cursor[data-peer="Panel Leader"]',
  );
  await cursor.waitFor({ state: 'visible' });
  await follower.waitForFunction(() => {
    const cursor = document
      .querySelector('#studio-live-cursors')
      ?.shadowRoot?.querySelector('[data-peer="Panel Leader"]');
    const box = cursor?.getBoundingClientRect();
    const panel = document.querySelector('.studio-left')?.getBoundingClientRect();
    return box && panel && box.x >= panel.x && box.x <= panel.right;
  });
  const box = await cursor.boundingBox();
  const panel = await follower.locator('.studio-left').boundingBox();
  assert.ok(box && panel && box.x >= panel.x && box.x <= panel.x + panel.width);
  await preview.locator('h1').hover({ position: { x: 35, y: 25 } });
  await preview.locator('h1').press('/');
  const input = preview.getByRole('textbox', { name: 'Cursor message' });
  await input.fill('Above the selection outline');
  await input.press('Enter');
  const localBubble = leader
    .locator('#studio-live-cursors .local-cursor .cursor-text')
    .filter({ hasText: 'Above the selection outline' });
  await localBubble.waitFor({ state: 'visible' });
  const remoteBubble = cursor
    .locator('.cursor-text')
    .filter({ hasText: 'Above the selection outline' });
  await remoteBubble.waitFor({ state: 'visible' });
  assert.equal(await localBubble.evaluate((node) => node.ownerDocument === window.document), true);
  assert.equal(
    await leader.locator('#studio-live-cursors').evaluate((node) => getComputedStyle(node).zIndex),
    '2147483647',
  );
  await leader.screenshot({ path: 'test-results/cursor-above-outlines.png' });
  const stoppedPanel = await follower
    .locator('.studio-rail button[aria-pressed=true]')
    .getAttribute('aria-label');
  await follower.getByRole('button', { name: 'Stop following Panel Leader', exact: true }).click();
  await follower.waitForFunction(
    () => !document.querySelector<HTMLElement>('.studio-right')?.inert,
  );
  await leader.getByRole('button', { name: 'Pages', exact: true }).click();
  await follower.waitForTimeout(250);
  assert.equal(
    await follower.locator('.studio-rail button[aria-pressed=true]').getAttribute('aria-label'),
    stoppedPanel,
  );
  assert.deepEqual(errors, []);
  console.log(
    'Following mirrors panels, inspection, nested two-axis scrolling and panel cursors; comments composite above outlines; unfollow restores control.',
  );
} finally {
  await browser.close();
}

async function nestedScrollers(page: Page) {
  await page.locator('.studio-left').evaluate((panel) => {
    const outer = document.createElement('div');
    outer.dataset['scrollTest'] = 'outer';
    outer.style.cssText =
      'position:absolute;left:0;top:200px;width:180px;height:140px;overflow:auto';
    const content = document.createElement('div');
    content.style.cssText = 'width:700px;height:600px';
    const inner = document.createElement('div');
    inner.dataset['scrollTest'] = 'inner';
    inner.style.cssText = 'width:200px;height:180px;overflow:auto';
    const child = document.createElement('div');
    child.style.cssText = 'width:800px;height:800px';
    inner.append(child);
    content.append(inner);
    outer.append(content);
    panel.append(outer);
  });
}
async function assertNested(page: Page, expected: number[]) {
  await page.waitForFunction((values) => {
    const outer = document.querySelector('[data-scroll-test="outer"]');
    const inner = document.querySelector('[data-scroll-test="inner"]');
    return (
      outer &&
      inner &&
      [outer.scrollLeft, outer.scrollTop, inner.scrollLeft, inner.scrollTop].every(
        (value, index) => Math.abs(value - (values[index] ?? 0)) < 2,
      )
    );
  }, expected);
}
