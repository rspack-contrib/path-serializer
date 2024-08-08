import { snakeCase } from 'lodash-es';
import type { ApplyPathMatcherOptions, PathMatcher } from './types';
import { compilePathMatcherRegExp, splitPathString } from './utils';

export function applyPathMatcher(
  matcher: PathMatcher,
  str: string,
  options: ApplyPathMatcherOptions = {},
) {
  const regex = compilePathMatcherRegExp(matcher.match);
  const replacer = (substring: string, ...args: any[]): string => {
    if (
      options.minPartials &&
      splitPathString(substring).length < options.minPartials
    ) {
      return substring;
    }
    const ret =
      typeof matcher.mark === 'string'
        ? matcher.mark
        : matcher.mark(substring, ...args);
    return `<${snakeCase(ret).toUpperCase()}>`;
  };
  return str.replace(regex, replacer);
}

export function applyMatcherReplacement(
  matchers: PathMatcher[],
  str: string,
  options: ApplyPathMatcherOptions = {},
) {
  return matchers.reduce((ret, matcher) => {
    return applyPathMatcher(matcher, ret, options);
  }, str);
}
