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
  root?: string;
  workspace?: string;
  replace?: PathMatcher[];
  replacePost?: PathMatcher[];
  features?: Features;
}

export interface ApplyPathMatcherOptions {
  minPartials?: number;
}
