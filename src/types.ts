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
  ansiDoubleQuotes?: boolean;
  /**
   * @default true
   */
  addDoubleQuotes?: boolean;
  /**
   * @default true
   */
  transformWin32Path?: boolean;
}

export interface SnapshotSerializerOptions {
  cwd?: string;
  workspace?: string;
  replace?: PathMatcher[];
  features?: Features;
}

export interface ApplyPathMatcherOptions {
  minPartials?: number;
}
