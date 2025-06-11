import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createSnapshotSerializer } from 'path-serializer';
import { expect, test } from 'vitest';

test('should work with __dirname', () => {
  expect.addSnapshotSerializer(
    createSnapshotSerializer({
      root: __dirname,
      features: {
        escapeDoubleQuotes: false,
        addDoubleQuotes: false,
      },
    }),
  );

  const case1 = join(__dirname, 'src', 'foo.ts');
  expect(case1).toMatchInlineSnapshot('<ROOT>/src/foo.ts');

  const case2 = pathToFileURL(case1).toString();
  expect(case2).toMatchInlineSnapshot('<ROOT>/src/foo.ts');

  const case3 = __dirname;
  expect(case3).toMatchInlineSnapshot('<ROOT>');
});

test('real world case: nodejs win32 error stack', () => {
  let stack: string;
  if (process.platform === 'win32') {
    expect.addSnapshotSerializer(
      createSnapshotSerializer({
        root: 'E:\\Project\\lynx-app',
        features: {
          escapeDoubleQuotes: false,
          addDoubleQuotes: false,
        },
      }),
    );
    stack = `× Error: Cannot find module 'E:\\Project\\lynx-app\\node_modules\\@lynx-js\\tasm\\build\\win32\\Release\\lepus.node'
    │ Require stack:
    │ - E:\\Project\\lynx-app\\node_modules\\@lynx-js\\tasm\\index.js
    │     at Module._resolveFilename (node:internal/modules/cjs/loader:1225:15)
    │     at Module._load (node:internal/modules/cjs/loader:1051:27)
    │     at Module.require (node:internal/modules/cjs/loader:1311:19)
    │     at require (node:internal/modules/helpers:179:18)
    │     at encode_napi (E:\\Project\\lynx-app\\node_modules\\@lynx-js\\tasm\\index.js:48:17)
    │     at Object.fn (file:///E:/Project/lynx-app/node_modules/@lynx-js/template-webpack-plugin/lib/LynxEncodePlugin.js:145:71)
    │     at Object.fn (file:///E:/Project/lynx-app/node_modules/@lynx-js/template-webpack-plugin/lib/LynxEncodePlugin.js:145:71)`;
  } else {
    expect.addSnapshotSerializer(
      createSnapshotSerializer({
        root: '/usr/project/lynx-app',
        features: {
          escapeDoubleQuotes: false,
          addDoubleQuotes: false,
        },
      }),
    );
    stack = `× Error: Cannot find module '/usr/project/lynx-app/node_modules/@lynx-js/tasm/build/win32/Release/lepus.node'
    │ Require stack:
    │ - /usr/project/lynx-app/node_modules/@lynx-js/tasm/index.js
    │     at Module._resolveFilename (node:internal/modules/cjs/loader:1225:15)
    │     at Module._load (node:internal/modules/cjs/loader:1051:27)
    │     at Module.require (node:internal/modules/cjs/loader:1311:19)
    │     at require (node:internal/modules/helpers:179:18)
    │     at encode_napi (/usr/project/lynx-app/node_modules/@lynx-js/tasm/index.js:48:17)
    │     at Object.fn (file:///usr/project/lynx-app/node_modules/@lynx-js/template-webpack-plugin/lib/LynxEncodePlugin.js:145:71)
    │     at Object.fn (file:///usr/project/lynx-app/node_modules/@lynx-js/template-webpack-plugin/lib/LynxEncodePlugin.js:145:71)`;
  }
  expect(stack).toMatchInlineSnapshot(`
    × Error: Cannot find module '<ROOT>/node_modules/@lynx-js/tasm/build/win32/Release/lepus.node'
        │ Require stack:
        │ - <ROOT>/node_modules/@lynx-js/tasm/index.js
        │     at Module._resolveFilename (node:internal/modules/cjs/loader:1225:15)
        │     at Module._load (node:internal/modules/cjs/loader:1051:27)
        │     at Module.require (node:internal/modules/cjs/loader:1311:19)
        │     at require (node:internal/modules/helpers:179:18)
        │     at encode_napi (<ROOT>/node_modules/@lynx-js/tasm/index.js:48:17)
        │     at Object.fn (<ROOT>/node_modules/@lynx-js/template-webpack-plugin/lib/LynxEncodePlugin.js:145:71)
        │     at Object.fn (file://<ROOT>/node_modules/@lynx-js/template-webpack-plugin/lib/LynxEncodePlugin.js:145:71)
  `);
});
