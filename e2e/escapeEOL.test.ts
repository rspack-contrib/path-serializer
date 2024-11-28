import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { expect } from 'vitest';
import { test } from 'vitest';
import { createSnapshotSerializer } from 'path-serializer';

test('should escapeEOL', async () => {
  const fileContent = await readFile(
    path.join(__dirname, './fixtures/rspress.js'),
    'utf8',
  );

  expect.addSnapshotSerializer(
    createSnapshotSerializer({
      features: {
        escapeDoubleQuotes: false,
      },
    }),
  );

  expect(fileContent).toMatchInlineSnapshot(`
    "import { useMDXComponents as _provideComponents } from '@mdx-js/react';
    export function _createMdxContent(props) {
      const _components = Object.assign(
        {
          div: 'div',
          p: 'p',
          code: 'code',
        },
        _provideComponents(),
        props.components,
      );
      return (
        <>
          <_components.div className="rspress-directive tip">
            <_components.div className="rspress-directive-title">
              {'TIP'}
            </_components.div>
            <_components.div className="rspress-directive-content">
              <_components.p>
                {'This is a '}
                <_components.code>{'block'}</_components.code>
                {' of type '}
                <_components.code>{'tip'}</_components.code>
                {'\\n'}
              </_components.p>
            </_components.div>
          </_components.div>
          {'\\n'}
          <_components.div className="rspress-directive info">
            <_components.div className="rspress-directive-title">
              {'INFO'}
            </_components.div>
            <_components.div className="rspress-directive-content">
              <_components.p>
                {'This is a '}
                <_components.code>{'block'}</_components.code>
                {' of type '}
                <_components.code>{'info'}</_components.code>
                {'\\n'}
              </_components.p>
            </_components.div>
          </_components.div>
          {'\\n'}
          <_components.div className="rspress-directive note">
            <_components.div className="rspress-directive-title">
              {'NOTE'}
            </_components.div>
            <_components.div className="rspress-directive-content">
              <_components.p>
                {'This is a '}
                <_components.code>{'block'}</_components.code>
                {' of type '}
                <_components.code>{'info'}</_components.code>
                {'\\n'}
              </_components.p>
            </_components.div>
          </_components.div>
          {'\\n'}
          <_components.div className="rspress-directive warning">
            <_components.div className="rspress-directive-title">
              {'WARNING'}
            </_components.div>
            <_components.div className="rspress-directive-content">
              <_components.p>
                {'This is a '}
                <_components.code>{'block'}</_components.code>
                {' of type '}
                <_components.code>{'warning'}</_components.code>
                {'\\n'}
              </_components.p>
            </_components.div>
          </_components.div>
          {'\\n'}
          <_components.div className="rspress-directive danger">
            <_components.div className="rspress-directive-title">
              {'DANGER'}
            </_components.div>
            <_components.div className="rspress-directive-content">
              <_components.p>
                {'This is a '}
                <_components.code>{'block'}</_components.code>
                {' of type '}
                <_components.code>{'danger'}</_components.code>
                {'\\n'}
              </_components.p>
            </_components.div>
          </_components.div>
          {'\\n'}
          <_components.div className="rspress-directive caution">
            <_components.div className="rspress-directive-title">
              {'CAUTION'}
            </_components.div>
            <_components.div className="rspress-directive-content">
              <_components.p>
                {'This is a '}
                <_components.code>{'block'}</_components.code>
                {' of type '}
                <_components.code>{'danger'}</_components.code>
                {'\\n'}
              </_components.p>
            </_components.div>
          </_components.div>
        </>
      );
    }
    "
  `);
});
