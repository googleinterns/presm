import url from 'url';
import fs from 'fs';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __root_dirname = path.dirname(path.dirname(__filename));

export function moduleWrapper(source) {
  return `export default ${source}`;
}

export function isWrappedModule(extensions) {
  if (extensions.includes('.mjs') || extensions.includes('.mjs')) {
    return false;
  } else {
    return true;
  }
}

export async function pathToRawSource(p) {
  const fileURL = url.pathToFileURL(p);
  return fs.promises.readFile(new URL(fileURL), 'utf8');
}

export function isBareSpecifier(specifier) {
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    return false;
  } else {
    return true;
  }
}
