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

export function isBareSpecifier(specifier) {
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    return false;
  } else {
    return true;
  }
}
