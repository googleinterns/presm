#!/usr/bin/env node
import yargs = require('yargs');

console.log("here");

const {argv} = yargs.options({
  a: { type: 'boolean', default: false },
  b: { type: 'string', demandOption: true },
  c: { type: 'number', alias: 'chill' },
  d: { type: 'array' },
  e: { type: 'count' },
  f: { choices: ['1', '2', '3'] }
});

console.info("Here0")
console.log(argv);