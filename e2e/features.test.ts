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
const a = ${require.resolve('@rslib/core')};
`;

  expect(fileContent).toMatchInlineSnapshot(`
    "use strict";
    const a = <ROOT>/node_modules/<PNPM_INNER>/@rslib/core/dist/index.js;
  `);
});
