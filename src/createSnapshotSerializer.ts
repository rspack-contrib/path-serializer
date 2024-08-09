import { applyMatcherReplacement } from './applyMatcherReplacement';
import { createDefaultPathMatchers } from './createDefaultPathMatchers';
import { transformCodeToPosixPath } from './transformCodeToPosixPath';
import type { PathMatcher, SnapshotSerializerOptions } from './types';
import { isPathString, normalizeToPosixPath } from './utils';

export function createSnapshotSerializer(options?: SnapshotSerializerOptions) {
  const {
    cwd = process.cwd(),
    workspace = process.cwd(),
    replace: customMatchers = [],
  } = options || {};

  const pathMatchers: PathMatcher[] = [
    { mark: 'root', match: cwd },
    { mark: 'workspace', match: workspace },
    ...customMatchers,
    ...createDefaultPathMatchers(),
  ];

  for (const matcher of pathMatchers) {
    if (typeof matcher.match === 'string') {
      matcher.match = normalizeToPosixPath(matcher.match);
    }
  }

  return {
    pathMatchers,
    // match path-format string
    test: (val: unknown) => typeof val === 'string' && isPathString(val),
    print: (val: unknown) => {
      const normalized = transformCodeToPosixPath(val as string);
      const replaced = applyMatcherReplacement(
        pathMatchers,
        normalized,
      ).replace(/"/g, '\\"');
      return `"${replaced}"`;
    },
  };
}
