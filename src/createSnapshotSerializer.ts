import { applyMatcherReplacement } from './applyMatcherReplacement';
import { createTmpDirMatchers } from './matchers';
import { transformCodeToPosixPath } from './transformCodeToPosixPath';
import type { PathMatcher, SnapshotSerializerOptions } from './types';
import { normalizeToPosixPath } from './utils';

interface SnapshotSerializer {
  serialize: (val: any) => string;
  test: (arg0: any) => boolean;
}

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
    transformWin32Path = true,
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
    pathMatchers.push(...customMatchers);
    if (replaceTmpDir) {
      pathMatchers.push(...createTmpDirMatchers());
    }
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
    serialize(val: unknown) {
      let replaced: string = val as string;
      if (transformWin32Path) {
        replaced = transformCodeToPosixPath(replaced);
      }

      replaced = applyMatcherReplacement(pathMatchers, replaced);

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
