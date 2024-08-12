import { describe, expect, test } from 'vitest';
import { normalizeToPosixPath } from './utils';

test('should serialize in windows', () => {
  const result = normalizeToPosixPath('C:\\no\\dirname;');
  expect(result).toMatchInlineSnapshot(`"/c/no/dirname;"`);

  const result2 = normalizeToPosixPath(
    'D:\\Users\\user\\Documents\\code\\user\\fe-dev-scripts\\src\\utils.ts',
  );
  expect(result2).toMatchInlineSnapshot(
    `"/d/Users/user/Documents/code/user/fe-dev-scripts/src/utils.ts"`,
  );

  const result3 = normalizeToPosixPath(
    'D:\\a\\rsbuild\\rsbuild\\packages\\plugin-babel',
  );
  expect(result3).toMatchInlineSnapshot(
    `"/d/a/rsbuild/rsbuild/packages/plugin-babel"`,
  );

  const result4 = normalizeToPosixPath(
    'D:/a/rsbuild/rsbuild/packages/compat/plugin-swc/tests',
  );
  expect(result4).toMatchInlineSnapshot(
    `"/d/a/rsbuild/rsbuild/packages/compat/plugin-swc/tests"`,
  );
});
