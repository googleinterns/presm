import tap from 'tap';
import * as child from 'child_process';

import {cleanSnapshot} from '../test-utils.mjs';

import {promisify} from 'util';

cleanSnapshot();
const execFile = promisify(child.execFile);

tap.test('TS System Tests', async t => {
  let {stdout, stderr} = await execFile('node', [
    '--experimental-top-level-await',
    '--experimental-loader=./src/loader.mjs',
    'test/fixtures/tsmodule4.ts',
  ]);

  tap.matchSnapshot(stdout);

  ({stdout, stderr} = await execFile('node', [
    '--experimental-top-level-await',
    '--experimental-loader=./src/loader.mjs',
    'test/fixtures/tsmodule2.ts',
  ]));

  tap.matchSnapshot(stdout);
});
