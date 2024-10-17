import { createRequire } from 'node:module';
import path from 'node:path';
import { expect, test } from 'vitest';
import { createSnapshotSerializer } from '../dist/esm/index';

const require = createRequire(import.meta.url);

expect.addSnapshotSerializer(
  createSnapshotSerializer({
    cwd: path.resolve(__dirname, '..'),
    workspace: path.resolve(__dirname, '..'),
  }),
);

test('should serialize <ROOT>', () => {
  const root = new URL('.', import.meta.url).href;

  expect(root).toMatchInlineSnapshot(`"file://<ROOT>/e2e/"`);
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
const a = ${require.resolve('@rslib/core')};
`;

  expect(fileContent).toMatchInlineSnapshot(`
    "\\"use strict\\";
    const a = <ROOT>/node_modules/<PNPM_INNER>/@rslib/core/dist/index.js;
    "
  `);

  expect(fileContent).toMatchSnapshot();
});
