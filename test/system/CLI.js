import tap from 'tap';
import * as child from 'child_process';

import {cleanSnapshot} from '../test-utils.js';

import {promisify} from 'util';

cleanSnapshot();
const execFile = promisify(child.execFile);

tap.test('[On-the-Fly] CLI Tests', async t => {
  let {stdout} = await execFile(
    'node',
    [
      '--loader=./src/loader.js',
      './test/fixtures/calc/calc_runner.ts',
      '-a',
      '5',
      '5',
    ],
    {
      env: {
        ...process.env,
        LOADER_CONFIG: './test/fixtures/loaderconfig6.json',
      },
    }
  );

  t.matchSnapshot(stdout, 'Transpiles TS and executes successfully');
});

tap.test('[Build] CLI Tests', async t => {
  const {stdout, stderr} = await execFile(
    'node',
    ['.', '--build', '--file', './test/fixtures/calc/calc_runner.ts'],
    {
      env: {
        ...process.env,
        LOADER_CONFIG: './test/fixtures/loaderconfig6.json',
      },
    }
  );
  t.matchSnapshot(stdout, 'Exits on incorrect build usage');
});

