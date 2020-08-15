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

// Definition of bare specifiers according to:
//  https://nodejs.org/api/esm.html#esm_terminology
// NOTE: future implementation will follow:
// https://html.spec.whatwg.org/multipage/webappapis.html#resolve-a-module-specifier
export function isBareSpecifier(specifier) {
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    return false;
  } else {
    return true;
  }
}
