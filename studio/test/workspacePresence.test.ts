import test from 'node:test';
import assert from 'node:assert/strict';
import { parseWorkspace } from '../src/features/collaboration/workspacePresence';
import { parseCursorState } from '../src/features/collaboration/cursorPresence';
import { parseCursorVisuals } from '../src/features/collaboration/cursorVisuals';
import { releaseSelectionOwners } from '../src/features/collaboration/selectionLock';

const workspace = {
  file: 'src/pages/index.astro',
  panel: 'code',
  tab: 'settings',
  scrolls: [{ surface: 'left', path: [1, 2], left: 200, top: 300 }],
};
test('workspace presence validates panels, nested positions and collection context', () => {
  assert.deepEqual(parseWorkspace(workspace).scrolls, workspace.scrolls);
  assert.throws(() => parseWorkspace({ ...workspace, panel: '<script>' }));
  assert.throws(() => parseWorkspace({ ...workspace, file: '../secret' }));
  assert.throws(() =>
    parseWorkspace({ ...workspace, scrolls: Array(257).fill(workspace.scrolls[0]) }),
  );
  assert.throws(() =>
    parseWorkspace({ ...workspace, scrolls: [{ surface: 'body', path: [], left: 0, top: 0 }] }),
  );
  assert.throws(() =>
    parseWorkspace({
      ...workspace,
      scrolls: [{ surface: 'left', path: [-1], left: Infinity, top: 0 }],
    }),
  );
});
test('editor cursor anchors are bounded and never interpreted as selectors', () => {
  const state = {
    page: workspace.file,
    cursor: {
      surface: 'editor',
      x: 0.5,
      y: 0.4,
      editorAnchor: { surface: 'right', path: [2, 0], x: 0.25, y: 0.8 },
    },
    text: 'hello',
    typing: false,
  };
  assert.deepEqual(parseCursorState(state), state);
  assert.throws(() =>
    parseCursorState({
      ...state,
      cursor: {
        ...state.cursor,
        editorAnchor: { ...state.cursor.editorAnchor, surface: 'right"] button' },
      },
    }),
  );
});
test('cursor compositing only accepts bounded plain text and colors', () => {
  const view = {
    x: 1,
    y: 2,
    labelX: 19,
    labelY: 24,
    name: 'You',
    text: 'hello',
    color: '#333333',
    textColor: 'white',
    local: true,
    typing: false,
    peer: '',
  };
  assert.equal(
    parseCursorVisuals({ width: 100, height: 100, views: [view] }).views[0]?.text,
    'hello',
  );
  assert.throws(() =>
    parseCursorVisuals({ width: 100, height: 100, views: [{ ...view, color: 'url(evil)' }] }),
  );
  assert.throws(() =>
    parseCursorVisuals({ width: 100, height: 100, views: [{ ...view, x: NaN }] }),
  );
});
test('following never inherits editing ownership when the leader leaves', () => {
  const peer = {
    id: 'follower',
    name: 'Follower',
    file: workspace.file,
    page: workspace.file,
    selection: 'n0',
    occurrence: 0,
    updatedAt: 1,
    editing: false,
    observing: true,
  };
  const peers = new Map([['socket', peer]]);
  releaseSelectionOwners(peers);
  assert.equal(peers.get('socket')?.editing, false);
});
