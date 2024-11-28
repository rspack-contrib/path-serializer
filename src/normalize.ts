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

export const normalizeCLR = (str: string): string => {
  return (
    str
      .replace(/\u001b\[1m\u001b\[([0-9;]*)m/g, '<CLR=$1,BOLD>')
      .replace(/\u001b\[1m/g, '<CLR=BOLD>')
      .replace(/\u001b\[39m\u001b\[22m/g, '</CLR>')
      .replace(/\u001b\[([0-9;]*)m/g, '<CLR=$1>')
      // CHANGE: The time unit display in Rspack is second
      .replace(/[.0-9]+(<\/CLR>)?(\s?s)/g, 'X$1$2')
  );
};
