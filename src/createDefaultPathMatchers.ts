import os from 'node:os';
import type { PathMatcher } from './types';
import { getRealTemporaryDirectory } from './utils';

export const createDefaultPathMatchers = () => {
  const ret: PathMatcher[] = [
    {
      match: /(?<=\/)(\.pnpm\/.+?\/node_modules)(?=\/)/g,
      mark: 'pnpmInner',
    },
  ];
  const tmpdir = getRealTemporaryDirectory();
  tmpdir && ret.push({ match: tmpdir, mark: 'temp' });
  ret.push({ match: os.tmpdir(), mark: 'temp' });
  ret.push({ match: os.homedir(), mark: 'home' });
  return ret;
};
