import { expect, test } from 'vitest';
import { createSnapshotSerializer } from 'path-serializer';

expect.addSnapshotSerializer(
  createSnapshotSerializer({
    root: 'D:\\user\\rspack',
    workspace: 'D:\\user\\rspack\\packages\\rspack-test-tools',
    features: {
      escapeDoubleQuotes: false,
      addDoubleQuotes: false,
      transformWin32Path: true,
    },
  }),
);

test('should serialize <PNPM_INNER> in win32', () => {
  const fileContent = {
    loader:
      'D:\\user\\rspack\\node_modules\\.pnpm\\css-loader@6.11.0_@rspack+core@packages+rspack_webpack@5.94.0_@swc+core@1.4.0_@swc+helpers@0._jlcdgjlw2ezzhg43ml3d627wdu\\node_modules\\css-loader\\utils.ts',
  };

  expect(fileContent).toMatchInlineSnapshot(`
    {
      loader: <ROOT>/node_modules/<PNPM_INNER>/css-loader/utils.ts,
    }
  `);
});

test('should serialize <PNPM_INNER> with webpack path', () => {
  const fileContent = {
    moduleIdentifier:
      'D:\\user\\rspack\\node_modules\\.pnpm\\css-loader@6.11.0_@rspack+core@packages+rspack_webpack@5.94.0_@swc+core@1.4.0_@swc+helpers@0._jlcdgjlw2ezzhg43ml3d627wdu\\node_modules\\css-loader\\dist\\cjs.js!D:\\user\\rspack\\packages\\rspack-test-tools\\tests\\fixtures\\css\\style.css',
  };

  expect(fileContent).toMatchInlineSnapshot(`
    {
      moduleIdentifier: <ROOT>/node_modules/<PNPM_INNER>/css-loader/dist/cjs.js!<WORKSPACE>/tests/fixtures/css/style.css,
    }
  `);
});

test('should serialize Lynx JSX', () => {
  const JSX = `
function App() {
    const value = "content 3";
    return __RenderContent(/*#__PURE__*/ (0,_lynx_js_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(__snapshot_4953c_00662_1, {
        children: value
    }, void 0, false, {
        fileName: "D:\\\\user\\\\rspack\\\\app.jsx",
        lineNumber: 3,
        columnNumber: 26
    }, this));
}
`;

  expect(JSX).toMatchInlineSnapshot(`
    function App() {
        const value = "content 3";
        return __RenderContent(/*#__PURE__*/ (0,_lynx_js_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(__snapshot_4953c_00662_1, {
            children: value
        }, void 0, false, {
            fileName: "<ROOT>/app.jsx",
            lineNumber: 3,
            columnNumber: 26
        }, this));
    }
  `);
});

test('should serialize rspack diagnostic', () => {
  const posixDiagnostic = `
  File: /d/user/rspack/src/index.ts?__rslib_entry__:1:1
  × Module not found: Can't resolve './a' in '/d/user/rspack//src'
   ╭─[1:14]
 1 │ import x from './a';
   ·               ───────
 2 │ console.log(x);
 3 │ export { createSnapshotSerializer } from './createSnapshotSerializer';
   ╰────
  help: Found module './a.ts'. However, it's not possible to request this module without the extension
        if its extension was not listed in the \`resolve.extensions\`. Here're some possible solutions:
        
        1. add the extension \`".ts"\` to \`resolve.extensions\` in your rspack configuration
        2. use './a.ts' instead of './a'
  `;
  expect(posixDiagnostic).toMatchInlineSnapshot(`
    File: <ROOT>/src/index.ts?__rslib_entry__:1:1
      × Module not found: Can't resolve './a' in '<ROOT>//src'
       ╭─[1:14]
     1 │ import x from './a';
       ·               ───────
     2 │ console.log(x);
     3 │ export { createSnapshotSerializer } from './createSnapshotSerializer';
       ╰────
      help: Found module './a.ts'. However, it's not possible to request this module without the extension
            if its extension was not listed in the \`resolve.extensions\`. Here're some possible solutions:
            
            1. add the extension \`".ts"\` to \`resolve.extensions\` in your rspack configuration
            2. use './a.ts' instead of './a'
  `);

  const diagnostic = `   
File: D:\\user\\rspack\\src\\index.ts?__rslib_entry__:1:1
  × Module not found: Can't resolve './a' in 'D:\\user\\rspack\\path-serializer\\src'
   ╭─[1:14]
 1 │ import x from './a';
   ·               ───────
 2 │ console.log(x);
 3 │ export { createSnapshotSerializer } from './createSnapshotSerializer';
   ╰────
  help: Found module './a.ts'. However, it's not possible to request this module without the extension
        if its extension was not listed in the \`resolve.extensions\`. Here're some possible solutions:
        
        1. add the extension \`".ts"\` to \`resolve.extensions\` in your rspack configuration
        2. use './a.ts' instead of './a'
`;

  expect(diagnostic).toMatchInlineSnapshot(`
    File: <ROOT>/src/index.ts?__rslib_entry__:1:1
      × Module not found: Can't resolve './a' in '<ROOT>/path-serializer/src'
       ╭─[1:14]
     1 │ import x from './a';
       ·               ───────
     2 │ console.log(x);
     3 │ export { createSnapshotSerializer } from './createSnapshotSerializer';
       ╰────
      help: Found module './a.ts'. However, it's not possible to request this module without the extension
            if its extension was not listed in the \`resolve.extensions\`. Here're some possible solutions:
            
            1. add the extension \`".ts"\` to \`resolve.extensions\` in your rspack configuration
            2. use './a.ts' instead of './a'
  `);
});
