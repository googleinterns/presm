#!/usr/bin/env node

import url from 'url';
import path from 'path';

import {createRequire} from 'module';
const loadViaRequire = createRequire(import.meta.url);
const {argv} = loadViaRequire('yargs')
  .option('b', {
    alias: 'build',
    describe: 'Build project',
    type: 'boolean',
    demandOption: false,
  })
  .option('f', {
    alias: 'file',
    describe: 'File to build',
    type: 'string',
    demandOption: false,
  });

async function main() {
  if (argv.build) {
    const {build} = await import('./build.js');
    await build(argv.file);
  }
}

main();
