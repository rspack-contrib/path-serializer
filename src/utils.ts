import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { escapeRegExp } from 'lodash-es';
import upath from 'upath';

export const isPathString = (test: string): boolean =>
  path.posix.basename(test) !== test || path.win32.basename(test) !== test;

export function getRealTemporaryDirectory() {
  let ret: string | null = null;
  try {
    ret = os.tmpdir();
    ret = fs.realpathSync(ret);
  } catch {}
  return ret;
}

export const normalizeToPosixPath = (p: string | undefined) => {
  return upath
    .normalizeSafe(path.normalize(p || ''))
    .replace(/^([a-zA-Z]+):/, (_: any, m: string) => `/${m.toLowerCase()}`);
};

/**
 * Compile path string to RegExp.
 * @note Only support posix path.
 */
export function compilePathMatcherRegExp(match: string | RegExp) {
  if (typeof match !== 'string') {
    return match;
  }
  const escaped = escapeRegExp(match);
  return new RegExp(`(?<=\\W|^)${escaped}(?=\\W|$)`, 'g');
}

export function splitPathString(str: string) {
  return str.split(/[\\/]/);
}
