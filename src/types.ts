export type PathMatchExpression = string | RegExp;

export interface PathMatcher {
  match: PathMatchExpression;
  mark: string | ((substring: string, ...args: any[]) => string);
}

export interface Features {
  /**
   * `file:///foo/rspack/packages/core/src` -> `<WORKSPACE>/src`
   * @default true
   */
  replaceWorkspaceWithFileProtocol?: boolean;
  /**
   * file:///foo/node_modules/.pnpm -> <ROOT>/node_modules/.pnpm
   * @default true
   */
  replaceRootWithFileProtocol?: boolean;
  /**
   * `D:\\foo\\node_modules\\<PNPM_INNER>\\css-loader\\utils.ts`
   *
   * ->
   *
   * `/d/foo/node_modules/<PNPM_INNER>/css-loader/utils.ts`
   * @default true
   */
  transformWin32Path?: boolean;
  /**
   * `/foo/rspack/packages/core/src` -> `<WORKSPACE>/src`
   * @default true
   */
  replaceWorkspace?: boolean;
  /**
   * `/foo/node_modules/.pnpm` -> `<ROOT>/node_modules/.pnpm`
   * @default true
   */
  replaceRoot?: boolean;
  /**
   * `/foo/node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_class_private_method_get.js`
   *
   * ->
   *
   * `/foo/node_modules/<PNPM_INNER>/@swc/helpers/esm/_class_private_method_get.js`
   * @default true
   */
  replacePnpmInner?: boolean;
  /**
   * `${os.tmpdir()}/src/index.ts` -> `<TEMP>/src/index.ts`
   * @default true
   */
  replaceTmpDir?: boolean;
  /**
   * `${os.homedir()}/src/index.ts` -> `<HOME>/src/index.ts`
   * @default true
   */
  replaceHomeDir?: boolean;
  /**
   * `\u001b[1mBold Text\u001b[0m` -> `<CLR=BOLD>Bold Text<CLR=0>`
   * @default true
   */
  transformCLR?: boolean;
  /**
   * `""` -> `\"\"`
   * @default true
   */
  escapeDoubleQuotes?: boolean;
  /**
   * `\r\n` -> `\n`
   * @default true
   */
  escapeEOL?: boolean;
  /**
   * `foo` -> `"foo"`
   * @default true
   */
  addDoubleQuotes?: boolean;
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
   * @description all the features is executed in order
   */
  features?: Features;
  /**
   * @description beforeSerialize -> replace -> workspace root pnpmInner temp home -> replacePost -> afterSerialize
   */
  replacePost?: PathMatcher[];
  /**
   * @description beforeSerialize -> replace -> workspace root pnpmInner temp home -> replacePost -> afterSerialize
   */
  afterSerialize?: (val: string) => string;
}

export interface ApplyPathMatcherOptions {
  minPartials?: number;
}
