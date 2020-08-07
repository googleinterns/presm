import url from 'url';

import fs from 'fs';

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

export async function pathToRawSource(absPath) {
  const fileURL = url.pathToFileURL(absPath);
  return fs.promises.readFile(new URL(fileURL), 'utf8');
}

export function getSourceFromPathSync(absPath) {
  const fileURL = url.pathToFileURL(absPath);
  return fs.readFileSync(new URL(fileURL), 'utf8');
}
