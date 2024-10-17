import { expect, test } from 'vitest';
import { createSnapshotSerializer } from '../dist/esm/index';

test('should serialize <PNPM_INNER> in win32', () => {
  const fileContent = `{
      loader: 'D:\\Users\\user\\Documents\\code\\user\\fe-dev-scripts\\node_modules\\.pnpm\\css-loader@6.11.0_@rspack+core@packages+rspack_webpack@5.94.0_@swc+core@1.4.0_@swc+helpers@0._jlcdgjlw2ezzhg43ml3d627wdu\\node_modules\\css-loader\\utils.ts',
  }`;

  expect.addSnapshotSerializer(
    createSnapshotSerializer({
      features: {
        escapeDoubleQuotes: false,
        addDoubleQuotes: false,
        transformWin32Path: false,
      },
    }),
  );

  expect(fileContent).toMatchInlineSnapshot(`
    {
          loader: 'D:\\Users\\user\\Documents\\code\\user\\fe-dev-scripts\\node_modules\\<PNPM_INNER>\\css-loader\\utils.ts',
      }
  `);
});

test('should serialize <PNPM_INNER> in win32 with transform', () => {
  const fileContent = `{
      loader: 'D:\\Users\\user\\Documents\\code\\user\\fe-dev-scripts\\node_modules\\.pnpm\\css-loader@6.11.0_@rspack+core@packages+rspack_webpack@5.94.0_@swc+core@1.4.0_@swc+helpers@0._jlcdgjlw2ezzhg43ml3d627wdu\\node_modules\\css-loader\\utils.ts',
  }`;

  expect.addSnapshotSerializer(
    createSnapshotSerializer({
      features: {
        escapeDoubleQuotes: false,
        addDoubleQuotes: false,
        transformWin32Path: true,
      },
    }),
  );

  expect(fileContent).toMatchInlineSnapshot(`
    {
          loader: '/d/Users/user/Documents/code/user/fe-dev-scripts/node_modules/<PNPM_INNER>/css-loader/utils.ts',
      }
  `);
});
