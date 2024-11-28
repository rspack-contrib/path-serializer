import { describe, expect, test } from 'vitest';
import {
  normalizeCodeToPosix,
  normalizePathToPosix,
  normalizeCLR,
} from './normalize';

describe('normalizePathToPosix', () => {
  test('should serialize in windows', () => {
    const result = normalizePathToPosix('C:\\no\\dirname;');
    expect(result).toMatchInlineSnapshot(`"/c/no/dirname;"`);

    const result2 = normalizePathToPosix(
      'D:\\Users\\user\\Documents\\code\\user\\fe-dev-scripts\\src\\utils.ts',
    );
    expect(result2).toMatchInlineSnapshot(
      `"/d/Users/user/Documents/code/user/fe-dev-scripts/src/utils.ts"`,
    );

    const result3 = normalizePathToPosix(
      'D:\\a\\rsbuild\\rsbuild\\packages\\plugin-babel',
    );
    expect(result3).toMatchInlineSnapshot(
      `"/d/a/rsbuild/rsbuild/packages/plugin-babel"`,
    );

    const result4 = normalizePathToPosix(
      'D:/a/rsbuild/rsbuild/packages/compat/plugin-swc/tests',
    );
    expect(result4).toMatchInlineSnapshot(
      `"/d/a/rsbuild/rsbuild/packages/compat/plugin-swc/tests"`,
    );
  });
});

describe('normalizeCodeToPosix', () => {
  test('should serialize webpack dist', () => {
    const code = normalizeCodeToPosix(`
  ;// CONCATENATED MODULE: ../../../../node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_class_private_method_get.js
function _class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");

    return fn;
}
`);
    expect(code).toMatchInlineSnapshot(`
    "
      ;// CONCATENATED MODULE: ../../../../node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_class_private_method_get.js
    function _class_private_method_get(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");

        return fn;
    }
    "
  `);
  });

  test('should serialize loader path', () => {
    const code = normalizeCodeToPosix(`
  {
      loader: 'D:\\Users\\user\\Documents\\code\\user\\fe-dev-scripts\\src\\utils.ts',
  }
  `);
    expect(code).toMatchInlineSnapshot(`
    "
      {
          loader: '/d/Users/user/Documents/code/user/fe-dev-scripts/src/utils.ts',
      }
      "
  `);

    const code2 = normalizeCodeToPosix(`{
    "cwd": "D:/a/rsbuild/rsbuild/packages/compat/plugin-swc/tests",
  }`);

    expect(code2).toMatchInlineSnapshot(`
    "{
        "cwd": "/d/a/rsbuild/rsbuild/packages/compat/plugin-swc/tests",
      }"
  `);
  });

  test('should not transform http and https', () => {
    const code = normalizeCodeToPosix(`
    {
        loader: 'http://localhost:8888',
    }
    `);
    expect(code).toMatchInlineSnapshot(`
    "
        {
            loader: 'http://localhost:8888',
        }
        "
  `);

    const code2 = normalizeCodeToPosix(`
    {
        loader: 'https://localhost:8888',
    }
    `);
    expect(code2).toMatchInlineSnapshot(`
    "
        {
            loader: 'https://localhost:8888',
        }
        "
  `);
  });
});

describe('normalizeCLR', () => {
  test('should replace bold ANSI escape sequences with <CLR=BOLD>', () => {
    const input = '\u001b[1mBold Text\u001b[0m';
    const expected = '<CLR=BOLD>Bold Text<CLR=0>';
    expect(normalizeCLR(input)).toBe(expected);
  });
});
