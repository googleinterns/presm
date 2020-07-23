import tap from 'tap';
import * as child from 'child_process';

import {cleanSnapshot} from '../test-utils.mjs';

import {promisify} from 'util';

cleanSnapshot();
const execFile = promisify(child.execFile);

tap.test('TS System Tests', async t => {
  let {stdout} = await execFile(
    'node',
    [
      '--experimental-top-level-await',
      '--experimental-loader=./src/loader.mjs',
      'test/fixtures/tsmodule4.ts',
    ],
    {
      env: {
        ...process.env,
        LOADER_CONFIG: './test/fixtures/loaderconfig1.json',
      },
    }
  );

  t.matchSnapshot(stdout);

  ({stdout} = await execFile(
    'node',
    [
      '--experimental-top-level-await',
      '--experimental-loader=./src/loader.mjs',
      'test/fixtures/tsmodule2.ts',
    ],
    {
      env: {
        ...process.env,
        LOADER_CONFIG: './test/fixtures/loaderconfig1.json',
      },
    }
  ));

  t.matchSnapshot(stdout);
});
