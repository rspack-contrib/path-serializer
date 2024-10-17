import { createRequire } from 'node:module';
import path from 'node:path';
import { expect, test } from 'vitest';
import { createSnapshotSerializer } from '../dist/esm/index';

const require = createRequire(import.meta.url);

expect.addSnapshotSerializer(
  createSnapshotSerializer({
    root: path.resolve(__dirname, '..'),
    workspace: __dirname,
  }),
);

test('should serialize <ROOT> and <WORKSPACE>', () => {
  const testWorkspace = __dirname;
  // Match workspace first, and then match root, so it can't be <ROOT>/e2e
  expect(testWorkspace).toMatchInlineSnapshot(`"<WORKSPACE>"`);

  const testRoot = path.join(__dirname, '../src');
  expect(testRoot).toMatchInlineSnapshot(`"<ROOT>/src"`);
});

test('should serialize <PNPM_INNER>', () => {
  expect(require.resolve('@rslib/core')).toMatchInlineSnapshot(
    `"<ROOT>/node_modules/<PNPM_INNER>/@rslib/core/dist/index.js"`,
  );
});

test('should serialize Object', () => {
  class MyObj {
    attr: string;
    constructor(attr: string) {
      this.attr = attr;
    }
  }

  const obj = new MyObj(require.resolve('@rslib/core'));
  expect(obj).toMatchInlineSnapshot(`
    MyObj {
      "attr": "<ROOT>/node_modules/<PNPM_INNER>/@rslib/core/dist/index.js",
    }
  `);
});

test('should serialize file content', () => {
  const fileContent = `"use strict";
const a = "${require.resolve('@rslib/core')}";
`;

  expect(fileContent).toMatchInlineSnapshot(`
    "\\"use strict\\";
    const a = \\"<ROOT>/node_modules/<PNPM_INNER>/@rslib/core/dist/index.js\\";
    "
  `);

  expect(fileContent).toMatchSnapshot();
});
