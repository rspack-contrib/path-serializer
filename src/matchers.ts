import os from 'node:os';
import type { PathMatcher } from './types';
import { getRealTemporaryDirectory } from './utils';

export const createTmpDirMatchers = (): PathMatcher[] => {
  const ret: PathMatcher[] = [];
  const tmpdir = getRealTemporaryDirectory();
  tmpdir && ret.push({ match: tmpdir, mark: 'temp' });
  ret.push({ match: os.tmpdir(), mark: 'temp' });
  ret.push({ match: os.homedir(), mark: 'home' });
  return ret;
};

export const createPnpmInnerMatchers = (): PathMatcher[] => {
  return [
    // posix
    {
      match: /(?<=\/)(\.pnpm\/.+?\/node_modules)(?=\/)/g,
      mark: 'pnpmInner',
    },
    // win32
    {
      match: /(?<=\\)(\.pnpm\\.+?\\node_modules)(?=\\)/g,
      mark: 'pnpmInner',
    },
  ];
};
