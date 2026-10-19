import assert from 'node:assert/strict';
import { test } from 'node:test';
import { followedPeer } from '../src/features/collaboration/followedPeer';
import { parsePeer } from '../src/features/collaboration/presence';
import { parseViewport } from '../src/features/collaboration/viewportPresence';
const peer = (id: string, participant: string, updatedAt: number) =>
  parsePeer({
    id,
    participant,
    updatedAt,
    githubId: 123,
    name: 'Editor',
    selection: '',
  });
test('following survives overlapping page connections and replacement tabs for the same account', () => {
  const original = peer('old', 'tab', 1);
  const next = { ...peer('new', 'tab', 2), page: 'src/pages/about.astro' };
  assert.equal(followedPeer([original, next], original), next);
  const replacement = peer('replacement', 'new-tab', 3);
  assert.equal(followedPeer([replacement], original), replacement);
  assert.equal(followedPeer([{ ...replacement, githubId: 456 }], original), undefined);
});
test('viewport offsets preserve exact position across heights while accepting older clients', () => {
  assert.deepEqual(
    parseViewport({ page: 'src/pages/index.astro', x: 0, y: 0.5, left: 0, top: 1234 }),
    {
      page: 'src/pages/index.astro',
      x: 0,
      y: 0.5,
      left: 0,
      top: 1234,
    },
  );
  assert.equal(parseViewport({ page: 'src/pages/index.astro', x: 0, y: 0.5 }).top, undefined);
  for (const top of [-1, Infinity, '1234', 10_000_001]) {
    assert.throws(() => parseViewport({ page: 'src/pages/index.astro', x: 0, y: 0, top }));
  }
});
