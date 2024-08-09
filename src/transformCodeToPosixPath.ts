import { normalizeToPosixPath } from './utils';
function transformCodeToPosixPath(code: string) {
  return code.replace(
    /([a-zA-Z]:\\)([-\u4e00-\u9fa5\w\s.()~!@#$%^&()\[\]{}+=]+\\)*/g,
    (match: string) => {
      return normalizeToPosixPath(match);
    },
  );
}

export { transformCodeToPosixPath };
