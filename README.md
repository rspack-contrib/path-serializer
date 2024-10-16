# path-serializer

 <a href="https://www.npmjs.com/package/path-serializer"><img src="https://img.shields.io/npm/v/path-serializer?style=flat-square&color=98c379" alt="latest version" /></a>

```ts
// __snapshots__/index.test.ts.snap
{
  "loader" : "<ROOT>/node_modules/<PNPM_INNER>/@rspack/core/dist/builtin-plugin/css-extract/loader-js"
}
```

## Usage

```typescript
// vitest.setup.ts
import { createSnapshotSerializer } from 'path-serializer';

expect.addSnapshotSerializer(
  createSnapshotSerializer({
    workspace: path.join(__dirname, '..'),
  }),
);
```

## Showcases

[Rslib](https://github.com/web-infra-dev/rslib/blob/3ff6859eb38171c731e447a1364afc021f8c501a/tests/setupVitestTests.ts)
[Rsbuild](https://github.com/web-infra-dev/rsbuild/blob/a50eafa3519caaa66ecd6b0ccb2897a8194781ff/scripts/test-helper/vitest.setup.ts)
