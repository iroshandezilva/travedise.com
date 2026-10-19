export function createCursorLayer() {
  document.getElementById('studio-live-cursors')?.remove();
  const host = document.createElement('div');
  host.id = 'studio-live-cursors';
  host.style.cssText =
    'all:initial;position:fixed;inset:0;z-index:2147483647;pointer-events:none;overflow:hidden;font:12px/1.4 system-ui,sans-serif;';
  const root = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = cursorStyles;
  root.append(style);
  document.documentElement.append(host);
  return { host, root };
}
export function createRemoteCursor(root: ShadowRoot) {
  const element = document.createElement('div');
  element.className = 'collaborator-cursor';
  const body = document.createElement('div');
  body.className = 'cursor-body';
  const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrow.setAttribute('viewBox', '0 0 253 253');
  arrow.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(arrow.namespaceURI, 'path');
  path.setAttribute(
    'd',
    'M0.491897 17.6375C-2.29744 7.22755 7.22834 -2.29827 17.6383 0.491075L242.191 60.6599C254.732 64.0202 256.34 81.1614 244.643 86.7958L142.524 135.986C139.668 137.362 137.363 139.667 135.987 142.523L86.7966 244.643C81.1622 256.34 64.021 254.731 60.6607 242.19L0.491897 17.6375Z',
  );
  arrow.append(path);
  const label = document.createElement('div');
  label.className = 'cursor-label';
  const name = document.createElement('div');
  name.className = 'cursor-name';
  const text = document.createElement('div');
  text.className = 'cursor-text';
  label.append(name, text);
  body.append(arrow, label);
  element.append(body);
  root.append(element);
  return { element, name, text, label };
}
export function createCursorEditor(root: ShadowRoot) {
  const { element, label, name, text } = createRemoteCursor(root);
  element.classList.add('cursor-editor');
  element.hidden = true;
  name.textContent = 'You';
  const input = document.createElement('textarea');
  input.maxLength = 160;
  input.placeholder = 'Say something…';
  input.setAttribute('aria-label', 'Cursor message');
  input.autocomplete = 'off';
  input.rows = 1;
  const measure = document.createElement('span');
  measure.className = 'cursor-measure';
  measure.setAttribute('aria-hidden', 'true');
  text.append(measure, input);
  return { element, label, input, measure };
}
const cursorStyles = `
:host { --cursor-inverse: 1; font: 12px/1.4 system-ui, sans-serif; color-scheme: light; }
:host([hidden]) { display: none !important; }
:host([data-composite]) .collaborator-cursor { transition: none !important; }
* { box-sizing: border-box; }
[hidden] { display: none !important; }
.collaborator-cursor { position: absolute; left: 0; top: 0; color: var(--peer-color); pointer-events: none; }
.cursor-body { transform: scale(var(--cursor-inverse)); transform-origin: top left; }
.cursor-body svg { display: block; width: 24px; height: 24px; overflow: visible; fill: currentColor; filter: drop-shadow(0 2px 3px #0006); }
.local-cursor svg, .cursor-editor svg { visibility: hidden; }
.cursor-label { position: absolute; left: 18px; top: 22px; width: max-content; max-width: 240px; color: var(--peer-text-color, white); text-align: left; }
.cursor-name { background: var(--peer-color); border-radius: 4px; padding: 3px 7px; max-width: 180px; width: max-content; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
.cursor-text { position: relative; background: var(--peer-color); border-radius: 0 6px 6px; padding: 6px 9px; margin-top: 3px; white-space: pre-wrap; overflow-wrap: anywhere; box-shadow: 0 2px 8px #0003; }
.cursor-text:empty { display: none; }
.cursor-typing .cursor-text::after { content: ''; border-right: 1px solid currentColor; margin-left: 1px; }
.cursor-measure { visibility: hidden; }
.cursor-editor textarea { all: unset; box-sizing: border-box; position: absolute; inset: 0; display: block; width: 100%; height: 100%; padding: 6px 9px; font: inherit; color: inherit; white-space: pre-wrap; overflow-wrap: anywhere; resize: none; overflow: hidden; cursor: text; pointer-events: auto; }
.cursor-editor textarea::placeholder { color: inherit; opacity: .7; }
@media (prefers-reduced-motion: reduce) { .collaborator-cursor { transition: none !important; } }
`;
