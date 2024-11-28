import path from 'node:path';
import { expect, test } from 'vitest';
import { createSnapshotSerializer } from 'path-serializer';

expect.addSnapshotSerializer(
  createSnapshotSerializer({
    root: path.resolve(__dirname, '..'),
  }),
);

test('should transform the color', () => {
  const input = '\u001b[1mBold Text\u001b[0m';
  expect(input).toMatchInlineSnapshot(`"<CLR=BOLD>Bold Text<CLR=0>"`);
});
