import { pathToFileURL } from 'node:url';
import { applyMatcherReplacement } from './applyMatcherReplacement';
import {
  createHomeDirMatchers,
  createPnpmInnerMatchers,
  createTmpDirMatchers,
} from './matchers';
import {
  normalizeCLR,
  normalizeCodeToPosix,
  normalizePathToPosix,
} from './normalize';
import type { PathMatcher, SnapshotSerializerOptions } from './types';

export interface SnapshotSerializer {
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
    beforeSerialize,
    afterSerialize,
  } = options || {};

  const {
    replaceWorkspaceWithFileProtocol = true,
    replaceWorkspace = true,
    replaceRootWithFileProtocol = true,
    replaceRoot = true,
    replacePnpmInner = true,
    replaceTmpDir = true,
    replaceHomeDir = true,
    addDoubleQuotes = true,
    transformWin32Path = true,
    escapeDoubleQuotes = true,
    escapeEOL = true,
    transformCLR = true,
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

      if (beforeSerialize) {
        replaced = beforeSerialize(replaced);
      }

      if (replaceWorkspaceWithFileProtocol && workspace) {
        // this is a polyfill for .replaceAll(string, string)
        replaced = replaced
          .split(pathToFileURL(workspace).toString())
          .join('<WORKSPACE>');
      }

      if (replaceRootWithFileProtocol && root) {
        // this is a polyfill for .replaceAll(string, string)
        replaced = replaced
          .split(pathToFileURL(root).toString())
          .join('<ROOT>');
      }

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

      if (afterSerialize) {
        replaced = afterSerialize(replaced);
      }
      return replaced;
    },
  };
  return serializer;
}
