import { applyMatcherReplacement } from './applyMatcherReplacement';
import {
  createHomeDirMatchers,
  createPnpmInnerMatchers,
  createTmpDirMatchers,
} from './matchers';
import type { PathMatcher, SnapshotSerializerOptions } from './types';
import {
  normalizePathToPosix,
  normalizeCodeToPosix,
  normalizeCLR,
} from './normalize';

interface SnapshotSerializer {
  serialize: (val: any) => string;
  test: (arg0: any) => boolean;
}

export function createSnapshotSerializer(
  options?: SnapshotSerializerOptions,
): SnapshotSerializer {
  const {
    root = process.cwd(),
    workspace = '',
    replace: customMatchers = [],
    replacePost: customPostMatchers = [],
    features = {},
  } = options || {};

  const {
    replaceRoot = true,
    replaceWorkspace = true,
    replacePnpmInner = true,
    replaceTmpDir = true,
    replaceHomeDir = true,
    addDoubleQuotes = true,
    transformWin32Path = true,
    escapeDoubleQuotes = true,
    escapeEOL = true,
    transformCLR = false,
  } = features;

  function createPathMatchers(): PathMatcher[] {
    const pathMatchers: PathMatcher[] = [];
    pathMatchers.push(...customMatchers);
    if (replaceWorkspace && workspace) {
      pathMatchers.push({ mark: 'workspace', match: workspace });
    }
    if (replaceRoot && root) {
      pathMatchers.push({ mark: 'root', match: root });
    }
    if (replacePnpmInner) {
      pathMatchers.push(...createPnpmInnerMatchers());
    }
    if (replaceTmpDir) {
      pathMatchers.push(...createTmpDirMatchers());
    }
    if (replaceHomeDir) {
      pathMatchers.push(...createHomeDirMatchers());
    }
    pathMatchers.push(...customPostMatchers);
    return pathMatchers;
  }
  const pathMatchers: PathMatcher[] = createPathMatchers();

  for (const matcher of pathMatchers) {
    if (typeof matcher.match === 'string') {
      matcher.match = normalizePathToPosix(matcher.match);
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
        replaced = normalizeCodeToPosix(replaced);
      }

      replaced = applyMatcherReplacement(pathMatchers, replaced);

      if (transformCLR) {
        replaced = normalizeCLR(replaced);
      }

      if (escapeDoubleQuotes) {
        replaced = replaced.replace(/"/g, '\\"');
      }
      if (escapeEOL) {
        replaced = replaced.replace(/\\r\\n/g, '\\n');
      }
      if (addDoubleQuotes) {
        replaced = `"${replaced}"`;
      }
      return replaced;
    },
  };
  return serializer;
}
