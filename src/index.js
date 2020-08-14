#!/usr/bin/env node

import {createRequire} from 'module';
const loadViaRequire = createRequire(import.meta.url);
const {argv} = loadViaRequire('yargs').option('b', {
  alias: 'build',
  describe: 'Your name',
  type: 'boolean',
  demandOption: false,
});

// async function build() {}
async function main() {
  if (argv.build) {
    const {build} = await import('./build.js');
    await build();
  }
}

main();
