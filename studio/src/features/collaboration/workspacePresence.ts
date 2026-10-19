import { parseDisclosures, type Disclosure } from './workspaceDisclosures';
import { record, sourcePath, string } from '../../shared/validation';
import type { Panel } from '../../app/EditorRail';
import type { CmsSelection } from '../cms/CmsWorkspace';
import type { VariableSelection } from '../../../vendor/stacki/src/features/variables/variablesBridge';
import { parseScrollPositions, type ScrollPosition } from './workspaceScroll';

export interface WorkspaceState {
  readonly file: string;
  readonly panel: Panel | undefined;
  readonly tab: 'style' | 'settings';
  readonly cms: CmsSelection | undefined;
  readonly variable: VariableSelection | undefined;
  readonly scrolls: readonly ScrollPosition[];
  readonly disclosures: readonly Disclosure[];
}
export interface WorkspacePacket extends WorkspaceState {
  readonly id: string;
}
const panels: readonly string[] = [
  'pages',
  'navigator',
  'properties',
  'components',
  'assets',
  'collections',
  'variables',
  'code',
  'history',
  'ai',
];
export function parseWorkspace(input: unknown): WorkspaceState {
  const value = record(input);
  const panel = value['panel'];
  if (panel !== undefined && (typeof panel !== 'string' || !panels.includes(panel))) {
    throw new Error('Invalid workspace panel');
  }
  if (value['tab'] !== 'style' && value['tab'] !== 'settings') {
    throw new Error('Invalid inspector tab');
  }
  return {
    file: sourcePath(value['file']),
    panel: parsePanel(panel),
    tab: value['tab'],
    cms: parseCms(value['cms']),
    variable: parseVariable(value['variable']),
    scrolls: parseScrollPositions(value['scrolls']),
    disclosures: parseDisclosures(value['disclosures']),
  };
}
function parsePanel(value: unknown): Panel | undefined {
  switch (value) {
    case undefined:
    case 'pages':
    case 'navigator':
    case 'properties':
    case 'components':
    case 'assets':
    case 'collections':
    case 'variables':
    case 'code':
    case 'history':
    case 'ai':
      return value;
    default:
      throw new Error('Invalid panel');
  }
}
function parseCms(input: unknown): CmsSelection | undefined {
  if (input === undefined) {
    return;
  }
  const value = record(input);
  if (value['kind'] === 'data') {
    return { kind: 'data', rel: string(value['rel'], 500), settings: value['settings'] === true };
  }
  if (value['kind'] === 'content') {
    return { kind: 'content', name: string(value['name'], 500) };
  }
  throw new Error('Invalid collection view');
}
function parseVariable(input: unknown): VariableSelection | undefined {
  if (input === undefined) {
    return;
  }
  const value = record(input);
  const index = value['index'];
  if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index > 10000) {
    throw new Error('Invalid variable index');
  }
  return { file: sourcePath(value['file']), index };
}
