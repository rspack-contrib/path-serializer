export type PathMatchExpression = string | RegExp;

export interface PathMatcher {
  match: PathMatchExpression;
  mark: string | ((substring: string, ...args: any[]) => string);
}

export interface Features {
  /**
   * @default true
   */
  replaceRoot?: boolean;
  /**
   * @default true
   */
  replaceWorkspace?: boolean;
  /**
   * @default true
   */
  replacePnpmInner?: boolean;
  /**
   * @default true
   */
  replaceTmpDir?: boolean;
  /**
   * @default true
   */
  replaceHomeDir?: boolean;
  /**
   * @default true
   */
  addDoubleQuotes?: boolean;
  /**
   * @default true
   */
  transformWin32Path?: boolean;
  /**
   * @default true
   */
  escapeDoubleQuotes?: boolean;
  /**
   * @default true
   */
  escapeEOL?: boolean;
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
   * @description replace -> workspace root pnpmInner temp home -> replacePost
   */
  replace?: PathMatcher[];
  /**
   * @description replace -> workspace root pnpmInner temp home -> replacePost
   */
  replacePost?: PathMatcher[];
  features?: Features;
}

export interface ApplyPathMatcherOptions {
  minPartials?: number;
}
