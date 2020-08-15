import tap from 'tap';
import * as child from 'child_process';

import {cleanSnapshot} from '../test-utils.js';

import {promisify} from 'util';

cleanSnapshot();
const execFile = promisify(child.execFile);

tap.test('TS System Tests', async t => {
  let {stdout} = await execFile(
    'node',
    ['--experimental-loader=./src/loader.js', 'test/fixtures/tsmodule4.ts'],
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
    ['--experimental-loader=./src/loader.js', 'test/fixtures/tsmodule2.ts'],
    {
      env: {
        ...process.env,
        LOADER_CONFIG: './test/fixtures/loaderconfig1.json',
      },
    }
  ));

  t.matchSnapshot(stdout);
});
