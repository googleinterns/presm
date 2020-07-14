import {createRequire} from 'module';
const loadViaRequire = createRequire(import.meta.url);

const {argv} = loadViaRequire('yargs')
  .alias('a', 'add')
  .array('a')
  .alias('s', 'sub')
  .array('s')
  .alias('m', 'mult')
  .array('m')
  .alias('d', 'div')
  .array('d');

import {calc} from './calc.js';

console.log(calc(argv));
