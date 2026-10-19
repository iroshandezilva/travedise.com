import { applyEdits, structuralEdits, flatten, nodesOf } from '../src/features/source/source';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { record, string } from '../src/shared/validation';

const url = process.env['STUDIO_URL'] ?? 'http://127.0.0.1:4360/studio';
const browser = await chromium.launch({
  executablePath:
    process.env['CHROME_PATH'] ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const auth = process.env['STUDIO_STORAGE_STATE'];
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  ...(auth ? { storageState: auth } : {}),
});
page.setDefaultTimeout(20000);
const endpoint = new URL('/studio/api/file?file=src/pages/index.astro', url).href;
const headingText = process.env['STUDIO_TEST_HEADING'] ?? 'Style Guide';
let original: string | undefined;
let changed: string | undefined;
let afterDelete: string | undefined;
let afterMove: string | undefined;
let releaseMove: (() => void) | undefined;
let rejectMove = false;
await page.routeWebSocket('**/studio/sync?*', (socket) => {
  const server = socket.connectToServer();
  socket.onMessage((message) => {
    if (String(message).includes('"kind":"move"')) {
      releaseMove = () =>
        server.send(
          rejectMove
            ? JSON.stringify({ ...record(JSON.parse(String(message))), checksum: 'outdated-page' })
            : message,
        );
    } else {
      server.send(message);
    }
  });
});
let started = 0;
const timings: { event: string; ms: number }[] = [];
page.on('websocket', (socket) =>
  socket.on('framereceived', (frame) => {
    const message = String(frame.payload);
    if (
      started &&
      (message.includes('"type":"update"') ||
        message.includes('"event":"studio:render"') ||
        message.includes('"event":"avb:page-changed"'))
    ) {
      timings.push({
        event: message.includes('"type":"update"')
          ? 'source'
          : message.includes('studio:render')
            ? 'render'
            : 'invalidation',
        ms: Math.round(performance.now() - started),
      });
    }
  }),
);
try {
  await page.goto(url);
  await page.locator('.save-state').filter({ hasText: 'Saved' }).waitFor();
  const canvas = page.frameLocator('iframe[title="Site preview"]');
  const heading = canvas.getByRole('heading', {
    name: headingText,
    exact: true,
  });
  await heading.waitFor();
  original = await readSource();
  await page.getByRole('button', { name: 'Expand all', exact: true }).click();
  await heading.click();
  await page
    .locator('.structure-node.selected')
    .filter({ has: page.locator('.label', { hasText: /^Heading$/ }) })
    .waitFor();
  started = performance.now();
  await page.locator('.structure-node.selected').click();
  await page.keyboard.press('Meta+d');
  try {
    await heading.nth(1).waitFor();
  } catch (error) {
    console.log(
      JSON.stringify({
        timings,
        toast: await page.locator('.studio-toast').allTextContents(),
        unchanged: (await readSource()) === original,
      }),
    );
    throw error;
  }
  const duplicate = Math.round(performance.now() - started);
  changed = await readSource();
  const duplicateNode = flatten(nodesOf(changed)).filter(
    (node) =>
      node.name === 'Heading' && node.children?.some((child) => child.value === headingText),
  )[1]?.id;
  assert.ok(duplicateNode);
  afterDelete = applyEdits(
    changed,
    structuralEdits(changed, { kind: 'delete', node: duplicateNode }, 'src/pages/index.astro'),
  );
  started = performance.now();
  await page.keyboard.press('Backspace');
  await heading.nth(1).waitFor({ state: 'detached' });
  const deleted = Math.round(performance.now() - started);
  assert.equal(await readSource(), afterDelete);
  await heading.click();
  started = await dragHeading();
  await page
    .frame({ url: /#avb-design$/ })
    ?.waitForFunction(
      () => document.querySelector('h1')?.previousElementSibling?.textContent?.includes('v1.0.0'),
      undefined,
      { timeout: 1500 },
    );
  const moved = Math.round(performance.now() - started);
  assert.equal(
    await readSource(),
    afterDelete,
    'Move is visible before the request reaches the server',
  );
  releaseHeldMove();
  await page.waitForFunction(() => {
    const labels = [...document.querySelectorAll('.structure-node .label')].map(
      (node) => node.textContent,
    );
    return labels.indexOf('Heading') > labels.indexOf('Eyebrow');
  });
  afterMove = await readSource();
  await page.locator('.save-state').filter({ hasText: 'Saved' }).waitFor();
  await page.waitForTimeout(200);
  await page.keyboard.press('Meta+z');
  await page
    .frame({ url: /#avb-design$/ })
    ?.waitForFunction(() =>
      document.querySelector('h1')?.nextElementSibling?.textContent?.includes('v1.0.0'),
    );
  assert.equal(await readSource(), afterDelete);
  await page.locator('.save-state').filter({ hasText: 'Saved' }).waitFor();
  await page.waitForTimeout(250);
  rejectMove = true;
  await heading.click();
  await dragHeading();
  await page
    .frame({ url: /#avb-design$/ })
    ?.waitForFunction(() =>
      document.querySelector('h1')?.previousElementSibling?.textContent?.includes('v1.0.0'),
    );
  releaseHeldMove();
  await page
    .getByText('Another edit arrived. Please repeat the drag or action.', { exact: true })
    .waitFor();
  await page
    .frame({ url: /#avb-design$/ })
    ?.waitForFunction(() =>
      document.querySelector('h1')?.nextElementSibling?.textContent?.includes('v1.0.0'),
    );
  assert.equal(
    await readSource(),
    afterDelete,
    'Rejected moves restore the preview without changing source',
  );
  console.log(JSON.stringify({ duplicate, deleted, moved, rejectedMoveRestored: true, timings }));
} catch (error) {
  console.error(error);
  console.log(
    'Failure state:',
    await page.locator('.studio-toast').allTextContents(),
    await page.locator('.structure-node.selected').allTextContents(),
    'held',
    !!releaseMove,
  );
  console.log(
    await page
      .frameLocator('iframe[title="Site preview"]')
      .locator('h1')
      .evaluate((node) => ({
        previous: node.previousElementSibling?.textContent,
        next: node.nextElementSibling?.textContent,
        path: node.getAttribute('data-avb-p'),
      })),
  );
  throw error;
} finally {
  releaseMove?.();
  await page.waitForTimeout(300);
  const base = await readSource();
  if (original && changed && (base === changed || base === afterDelete || base === afterMove)) {
    const response = await page.request.post(new URL('/studio/api/source', url).href, {
      headers: { Origin: new URL(url).origin },
      data: { file: 'src/pages/index.astro', source: original, base },
    });
    assert.ok(response.ok());
  }
  await browser.close();
}
async function readSource() {
  return string(record(await (await page.request.get(endpoint)).json())['source']);
}

async function dragHeading() {
  await page
    .locator('.structure-node')
    .filter({ has: page.locator('.label', { hasText: /^Heading$/ }) })
    .click();
  const started = performance.now();
  // Native pointer and touch dragging are covered by browser.ts. Dispatch the
  // same DnD events here so network withholding tests do not depend on drag geometry.
  await page.evaluate(() => {
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
  return started;
}

function releaseHeldMove() {
  assert.ok(releaseMove);
  releaseMove();
  releaseMove = undefined;
}
