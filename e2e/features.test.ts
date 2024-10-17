import path from 'node:path';
import { expect } from 'vitest';
import { test } from 'vitest';
import { createSnapshotSerializer } from '../dist/esm/index';

expect.addSnapshotSerializer(
  createSnapshotSerializer({
    cwd: path.resolve(__dirname, '..'),
    workspace: path.resolve(__dirname, '..'),
    features: {
      ansiDoubleQuotes: false,
      addDoubleQuotes: false,
    },
  }),
);

test('should serialize file content without escaping \\"', () => {
  const fileContent = `"use strict";
const a = "${require.resolve('@rslib/core')}";
`;

  expect(fileContent).toMatchInlineSnapshot(`
    "use strict";
    const a = "<ROOT>/node_modules/<PNPM_INNER>/@rslib/core/dist/index.js";
  `);
});

test('should serialize webpack output content', () => {
  const fileContent = `;// CONCATENATED MODULE: ../../../../node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_class_private_method_get.js
function _class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");

    return fn;
}
`;

  expect(fileContent).toMatchInlineSnapshot(`
    ;// CONCATENATED MODULE: ../../../../node_modules/<PNPM_INNER>/@swc/helpers/esm/_class_private_method_get.js
    function _class_private_method_get(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");

        return fn;
    }
  `);
});

test('should serialize the Win32 path', () => {
  const fileContent = `{
      loader: 'D:\\Users\\user\\Documents\\code\\user\\fe-dev-scripts\\src\\utils.ts',
  }`;

  expect(fileContent).toMatchInlineSnapshot(`
    {
          loader: '/d/Users/user/Documents/code/user/fe-dev-scripts/src/utils.ts',
      }
  `);
});
