#!/usr/bin/env node

import url from 'url';
import path from 'path';

import {createRequire} from 'module';
const loadViaRequire = createRequire(import.meta.url);
const {argv} = loadViaRequire('yargs')
  .option('f', {
    alias: 'file',
    describe: 'File to build',
    type: 'string',
    demandOption: false,
  })
  .option('o', {
    alias: 'output',
    describe: 'Directory to output; overwrites loaderconfig',
    type: 'string',
    demandOption: false,
  });

async function main() {
  const {build} = await import('./build.js');
  await build(argv.file, argv.output);
}

main();
