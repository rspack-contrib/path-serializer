import path from 'node:path';
import { createSnapshotSerializer } from 'path-serializer';
import { describe, expect } from 'vitest';
import { test } from 'vitest';

expect.addSnapshotSerializer(
  createSnapshotSerializer({
    root: path.resolve(__dirname, '..'),
    features: {
      escapeDoubleQuotes: false,
      addDoubleQuotes: false,
    },
  }),
);

test('transformWin32Path', () => {
  const fileContent = `{
      loader: 'D:\\Users\\user\\Documents\\code\\user\\fe-dev-scripts\\src\\utils.ts',
  }`;

  expect(fileContent).toMatchInlineSnapshot(`
    {
          loader: '/d/Users/user/Documents/code/user/fe-dev-scripts/src/utils.ts',
      }
  `);
});

test('transformWin32RelativePath', () => {
  const case1 = `Cannot find file "..\\..\\getting-started\\next"`;

  expect(case1).toMatchInlineSnapshot(
    `Cannot find file "../../getting-started/next"`,
  );

  const case2 = `Cannot find file "..\\getting-started\\next"`;
  expect(case2).toMatchInlineSnapshot(
    `Cannot find file "../getting-started/next"`,
  );

  const case3 = `Cannot find file ".\\getting-started\\next"`;
  expect(case3).toMatchInlineSnapshot(
    `Cannot find file "./getting-started/next"`,
  );
});

describe('transformCLR', () => {
  test('should transform the color', () => {
    const input = '\u001b[1mBold Text\u001b[0m';
    expect(input).toMatchInlineSnapshot('<CLR=BOLD>Bold Text<CLR=0>');
  });

  test('bad case 1', () => {
    const input = 'static/react.svg'; // bad case: 'static/reactXsvg'
    expect(input).toMatchInlineSnapshot('static/react.svg');
  });
});
