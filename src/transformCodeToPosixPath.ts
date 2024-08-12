import { normalizeToPosixPath } from './utils';
function transformCodeToPosixPath(code: string) {
  return code.replace(
    // windows absolute path
    // ignore http, https, file
    /(?<![a-zA-Z])([a-zA-Z]:[\\/])([-\u4e00-\u9fa5\w\s.()~!@#$%^&()\[\]{}+=]+[\\/])*/g,
    (match: string, _diskName: string) => {
      return normalizeToPosixPath(match);
    },
  );
}

export { transformCodeToPosixPath };
