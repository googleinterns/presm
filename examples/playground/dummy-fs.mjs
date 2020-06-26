import * as fs from 'fs';

export let prefixes = ["file:"];

export let suffixes = [];

// Following was adapted from the example in the Node.js docs
// https://nodejs.org/api/esm.html#esm_code_resolve_code_hook
export async function resolve(specifier, context, defaultResolve) {

    console.log(`### Resolving resource in dummy resourceProvider for ${specifier}`);

    return defaultResolve(specifier, context, defaultResolve);
  }

export function getResourceProvider() {
    return { 
        async getResource(url){

            console.log("### Getting resource in dummy resourceProvider");

            return new Promise((resolve, reject) => {
                fs.readFile(new URL(url), 'utf8', (err, data) => {
                    resolve(data);
                });
            })
        }
    }
}