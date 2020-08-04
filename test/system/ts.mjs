import tap from 'tap';
import * as child from 'child_process';

import {promises as fs} from 'fs';

import {cleanSnapshot} from '../test-utils.mjs';

import {promisify} from 'util';

cleanSnapshot();
const execFile = promisify(child.execFile);

tap.test('TS System Tests', {saveFixture: true}, async t => {
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

  // The following uses a placeholder build file to simulate using
  // PRESM with a build flag
  const buildPath = './dist/test.mjs';

  ({stdout} = await execFile(
    'node',
    [
      '--experimental-top-level-await',
      '--experimental-loader=./src/loader.mjs',
      'test/fixtures/noop.js',
      '--build',
    ],
    {
      env: {
        ...process.env,
        LOADER_CONFIG: './test/fixtures/loaderconfig1.json',
      },
    }
  ));

  // Confirm that files were written
  t.resolves(fs.access(buildPath), 'Build step writes files');

  ({stdout} = await execFile('node', [buildPath], {
    env: {
      ...process.env,
      LOADER_CONFIG: './test/fixtures/loaderconfig1.json',
    },
  }));

  t.matchSnapshot(stdout, 'Built files execute correctly');
});
