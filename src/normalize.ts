import path from 'node:path';
import upath from 'upath';

export const normalizePathToPosix = (p: string | undefined): string => {
  return upath
    .normalizeSafe(path.normalize(p || ''))
    .replace(/^([a-zA-Z]+):/, (_: any, m: string) => `/${m.toLowerCase()}`);
};

// find the path in code and replace it with normalizePathToPosix
export const normalizeCodeToPosix = (code: string): string => {
  return code.replace(
    // windows absolute path
    // ignore http, https, file
    /(?<![a-zA-Z])([a-zA-Z]:[\\/])([-\u4e00-\u9fa5\w\s.()~!@#$%^&()\[\]{}+=]+[\\/])*/g,
    (match: string, _diskName: string) => {
      return normalizePathToPosix(match);
    },
  );
};

export function normalizeWin32RelativePath(p: string): string {
  return p.replace(
    /(['"`])(\.\.?([\\/]))+((?:[^\W_]|-)+\3?)+[^\\/]*\1/g,
    (match: string) => {
      return match.replace(/\\/g, '/');
    },
  );
}

export const normalizeCLR = (str: string): string => {
  return (
    str
      // biome-ignore lint/suspicious/noControlCharactersInRegex: copied code
      .replace(/\u001b\[1m\u001b\[([0-9;]*)m/g, '<CLR=$1,BOLD>')
      // biome-ignore lint/suspicious/noControlCharactersInRegex: copied code
      .replace(/\u001b\[1m/g, '<CLR=BOLD>')
      // biome-ignore lint/suspicious/noControlCharactersInRegex: copied code
      .replace(/\u001b\[39m\u001b\[22m/g, '</CLR>')
      // biome-ignore lint/suspicious/noControlCharactersInRegex: copied code
      .replace(/\u001b\[([0-9;]*)m/g, '<CLR=$1>')
      // CHANGE: The time unit display in Rspack is second
      // CHANGE2: avoid a bad case "./react/assets.svg" -> "./react/assetsXsvg"
      // modified based on https://github.com/webpack/webpack/blob/001cab14692eb9a833c6b56709edbab547e291a1/test/StatsTestCases.basictest.js#L199
      .replace(/[0-9]+(\.[0-9]+)*(<\/CLR>)?(\s?s)/g, 'X$2$3')
  );
};
