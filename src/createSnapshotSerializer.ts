import { applyMatcherReplacement } from './applyMatcherReplacement';
import { createPnpmInnerMatchers, createTmpDirMatchers } from './matchers';
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
    root = process.cwd(),
    workspace = process.cwd(),
    replace: customMatchers = [],
    replacePost: customPostMatchers = [],
    features = {},
  } = options || {};

  const {
    replaceRoot = true,
    replaceWorkspace = true,
    replacePnpmInner = true,
    replaceTmpDir = true,
    addDoubleQuotes = true,
    transformWin32Path = true,
    escapeDoubleQuotes = true,
    escapeEOL = true,
  } = features;

  function createPathMatchers(): PathMatcher[] {
    const pathMatchers: PathMatcher[] = [];
    pathMatchers.push(...customMatchers);
    if (replaceRoot) {
      pathMatchers.push({ mark: 'root', match: root });
    }
    if (replaceWorkspace) {
      pathMatchers.push({ mark: 'workspace', match: workspace });
    }
    if (replacePnpmInner) {
      pathMatchers.push(...createPnpmInnerMatchers());
    }
    if (replaceTmpDir) {
      pathMatchers.push(...createTmpDirMatchers());
    }
    pathMatchers.push(...customPostMatchers);
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

      if (escapeDoubleQuotes) {
        replaced = replaced.replace(/"/g, '\\"');
      }
      if (escapeEOL) {
        replaced = replaced.replace(/\\r\\n/g, '\n');
      }
      if (addDoubleQuotes) {
        replaced = `"${replaced}"`;
      }
      return replaced;
    },
  };
  return serializer;
}
