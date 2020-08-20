import {promises as fs} from 'fs';

export const prefixes = ['file:'];

export const suffixes = [];

// Following was adapted from the example in the Node.js docs
// https://nodejs.org/api/esm.html#esm_code_resolve_code_hook
export async function resolve(specifier, context, defaultResolve) {
  if (process.env.DEBUG === 'true') {
    console.log(
      `### Resolving resource in basic resourceProvider for ${specifier}\n`
    );
  }

  return defaultResolve(specifier, context, defaultResolve);
}

export function getResourceProvider() {
  return {
    async getResource(url) {
      if (process.env.DEBUG === 'true') {
        console.log(
          `### Getting resource in basic resourceProvider for ${url}\n`
        );
      }
      return fs.readFile(new URL(url), 'utf8');
    },
  };
}
