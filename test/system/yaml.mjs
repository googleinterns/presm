import tap from 'tap';
import * as child from 'child_process';

import {cleanSnapshot} from '../test-utils.mjs';


import {promisify} from 'util';

cleanSnapshot();


tap.test('YAML System Tests', async t => {
  const execFile = promisify(child.execFile);

  let {stdout, stderr} = await execFile('node', [
    '--experimental-top-level-await',
    '--experimental-loader=./src/loader.mjs',
    'test/fixtures/yamlTest.mjs',
  ]);

  tap.matchSnapshot(stdout);
});
