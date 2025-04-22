export type PathMatchExpression = string | RegExp;

export interface PathMatcher {
  match: PathMatchExpression;
  mark: string | ((substring: string, ...args: any[]) => string);
}

export interface Features {
  /**
   * /foo/node_modules/.pnpm -> <ROOT>/node_modules/.pnpm
   * @default true
   */
  replaceRoot?: boolean;
  /**
   * /foo/rspack/packages/core/src -> <WORKSPACE>/src
   * @default true
   */
  replaceWorkspace?: boolean;
  /**
   * /foo/node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_class_private_method_get.js
   * -> /foo/node_modules/<PNPM_INNER>/@swc/helpers/esm/_class_private_method_get.js
   * @default true
   */
  replacePnpmInner?: boolean;
  /**
   * <TEMP>
   * @default true
   */
  replaceTmpDir?: boolean;
  /**
   * <HOME>
   * @default true
   */
  replaceHomeDir?: boolean;
  /**
   * foo -> "foo"
   * @default true
   */
  addDoubleQuotes?: boolean;
  /**
   * D:\\foo\\node_modules\\<PNPM_INNER>\\css-loader\\utils.ts
   * -> /d/foo/node_modules/<PNPM_INNER>/css-loader/utils.ts
   * @default true
   */
  transformWin32Path?: boolean;
  /**
   * `..\..\getting-started\next`
   * -> `../../getting-started/next`
   * @default true
   */
  transformWin32RelativePath?: boolean;
  /**
   * "" -> \"\"
   * @default true
   */
  escapeDoubleQuotes?: boolean;
  /**
   * \r\n -> \n
   * @default true
   */
  escapeEOL?: boolean;
  /**
   * \u001b[1mBold Text\u001b[0m
   * -> <CLR=BOLD>Bold Text<CLR=0>
   * @default true
   */
  transformCLR?: boolean;
}

export interface SnapshotSerializerOptions {
  /**
   * repository root path
   * @example '/Users/foo/codes/rsbuild/node_modules/.pnpm' -> '<ROOT>/node_modules/.pnpm'
   * @default process.cwd()
   */
  root?: string;
  /**
   * workspace root path
   * @example '/Users/foo/codes/rsbuild/packages/core/src' -> '<WORKSPACE>/src'
   * @default ''
   */
  workspace?: string;
  /**
   * @description beforeSerialize -> replace -> workspace root pnpmInner temp home -> replacePost -> afterSerialize
   */
  beforeSerialize?: (val: string) => string;
  /**
   * @description beforeSerialize -> replace -> workspace root pnpmInner temp home -> replacePost -> afterSerialize
   */
  replace?: PathMatcher[];
  /**
   * @description beforeSerialize -> replace -> workspace root pnpmInner temp home -> replacePost -> afterSerialize
   */
  replacePost?: PathMatcher[];
  /**
   * @description beforeSerialize -> replace -> workspace root pnpmInner temp home -> replacePost -> afterSerialize
   */
  afterSerialize?: (val: string) => string;
  features?: Features;
}

export interface ApplyPathMatcherOptions {
  minPartials?: number;
}
