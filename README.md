# path-serializer

[![npm latest version](https://img.shields.io/npm/v/path-serializer?style=flat-square&color=98c379)](https://www.npmjs.com/package/path-serializer)

1. stabilize pnpm dependencies path and update dependencies smoothly
2. transform win32 path to posix path
   and more...

```ts
// __snapshots__/index.test.ts.snap
// 😭 bad
{
  "loader" : "D:\\user\\rspack\\node_modules\\.pnpm\\css-loader@6.11.0_@rspack+core@packages+rspack_webpack@5.94.0_@swc+core@1.4.0_@swc+helpers@0._jlcdgjlw2ezzhg43ml3d627wdu\\node_modules\\css-loader\\utils.ts"
}
//😎👍🏻 good
{
  "loader" : "<ROOT>/node_modules/<PNPM_INNER>/css-loader/utils.ts"
}
```

## Usage

```typescript
// vitest.setup.ts
import { createSnapshotSerializer } from 'path-serializer';

expect.addSnapshotSerializer(
  createSnapshotSerializer({
    root: path.join(__dirname, '..'),
  }),
);
```

The specific usage can be found in [./src/types.ts](https://github.com/rspack-contrib/path-serializer/blob/main/src/types.ts)

## Showcases

[Rslib](https://github.com/web-infra-dev/rslib/blob/3ff6859eb38171c731e447a1364afc021f8c501a/tests/setupVitestTests.ts)

[Rsbuild](https://github.com/web-infra-dev/rsbuild/blob/a50eafa3519caaa66ecd6b0ccb2897a8194781ff/scripts/test-helper/vitest.setup.ts)

[Rspack](https://github.com/web-infra-dev/rspack/blob/5a6162c/packages/rspack-test-tools/src/helper/expect/placeholder.ts)
