import type { SnapshotSerializer } from 'vitest';
import { applyMatcherReplacement } from './applyMatcherReplacement';
import { createTmpDirMatchers } from './matchers';
import { transformCodeToPosixPath } from './transformCodeToPosixPath';
import type { PathMatcher, SnapshotSerializerOptions } from './types';
import { normalizeToPosixPath } from './utils';

export function createSnapshotSerializer(
  options?: SnapshotSerializerOptions,
): SnapshotSerializer {
  const {
    cwd = process.cwd(),
    workspace = process.cwd(),
    replace: customMatchers = [],
    features = {},
  } = options || {};

  const {
    replaceRoot = true,
    replaceWorkspace = true,
    replacePnpmInner = true,
    replaceTmpDir = true,
    ansiDoubleQuotes = true,
    addDoubleQuotes = true,
  } = features;

  function createPathMatchers(): PathMatcher[] {
    const pathMatchers: PathMatcher[] = [];
    if (replaceRoot) {
      pathMatchers.push({ mark: 'root', match: cwd });
    }
    if (replaceWorkspace) {
      pathMatchers.push({ mark: 'workspace', match: workspace });
    }
    if (replacePnpmInner) {
      pathMatchers.push({
        match: /(?<=\/)(\.pnpm\/.+?\/node_modules)(?=\/)/g,
        mark: 'pnpmInner',
      });
    }
    if (replaceTmpDir) {
      pathMatchers.push(...createTmpDirMatchers());
    }
    pathMatchers.push(...customMatchers);
    return pathMatchers;
  }
  const pathMatchers: PathMatcher[] = createPathMatchers();

  for (const matcher of pathMatchers) {
    if (typeof matcher.match === 'string') {
      matcher.match = normalizeToPosixPath(matcher.match);
    }
  }

  const serializer: SnapshotSerializer = {
    // match path-format string
    test(val: unknown) {
      return typeof val === 'string';
    },
    serialize(
      val: unknown,
      _config,
      _indentation: string,
      _depth: number,
      _refs,
      _printer,
    ) {
      const normalized = transformCodeToPosixPath(val as string);
      let replaced = applyMatcherReplacement(pathMatchers, normalized);

      if (ansiDoubleQuotes) {
        replaced = replaced.replace(/"/g, '\\"');
      }
      if (addDoubleQuotes) {
        replaced = `"${replaced}"`;
      }
      return replaced;
    },
  };
  return serializer;
}
