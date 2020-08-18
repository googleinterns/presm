import tap from 'tap';
import * as child from 'child_process';

import {cleanSnapshot} from '../test-utils.js';

import {promisify} from 'util';

cleanSnapshot();
const execFile = promisify(child.execFile);

tap.test('CLI Tests', async t => {
  t.test('[On-the-Fly]', async t => {
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

  t.test('[Build] - Incorrect Usage', async t => {
    const {stdout, stderr} = await execFile(
      'node',
      ['./src/index.js', '--file', './test/fixtures/calc/calc_runner.ts'],
      {
        env: {
          ...process.env,
          LOADER_CONFIG: './test/fixtures/loaderconfig6.json',
        },
      }
    );
    t.matchSnapshot(stdout, 'Exits on incorrect build usage');
  });

  t.test(
    '[Build] CLI Tests - Build Directory',
    {saveFixture: false},
    async t => {
      const dir = t.testdir();

      let {stdout, stderr} = await execFile(
        'node',
        ['./src/index.js', '--output', dir],
        {
          env: {
            ...process.env,
            LOADER_CONFIG: './test/fixtures/loaderconfig6.json',
          },
        }
      );

      ({stdout, stderr} = await execFile('node', [
        dir + '/calc_runner.mjs',
        '-a',
        '5',
        '5',
      ]));

      t.matchSnapshot(stdout, 'Builds and executes written files');
    }
  );
});
