export type PathMatchExpression = string | RegExp;

export interface PathMatcher {
  match: PathMatchExpression;
  mark: string | ((substring: string, ...args: any[]) => string);
}

export interface SnapshotSerializerOptions {
  cwd?: string;
  workspace?: string;
  replace?: PathMatcher[];
}

export interface ApplyPathMatcherOptions {
  minPartials?: number;
}
