import tap from 'tap';
import * as child from 'child_process';

import {cleanSnapshot} from '../test-utils.js';

import {promisify} from 'util';

cleanSnapshot();

tap.test('YAML System Tests', async t => {
  const execFile = promisify(child.execFile);

  const {stdout} = await execFile(
    'node',
    [
      '--experimental-top-level-await',
      '--experimental-loader=./src/loader.js',
      'test/fixtures/yamlTest.js',
    ],
    {
      env: {
        ...process.env,
        LOADER_CONFIG: './test/fixtures/loaderconfig1.json',
      },
    }
  );

  t.matchSnapshot(stdout);

  // YAML Build Tests
  // - simple transformation (YAML to JS)

  function matchSnapshotSource(buildMap, msg) {
    buildMap.forEach(fileSourcePair => {
      t.matchSnapshot(fileSourcePair[1], msg);
    });
  }

  function matchSnapshotFileURL(buildMap, msg) {
    t.matchSnapshot(
      buildMap.map(fileSourcePair => fileSourcePair[0].href),
      msg
    );
  }
  // Simple transpilation
  let config = (await import('../../src/core.js')).getConfig(
    './test/fixtures/loaderconfig5.json'
  );

  let generateBuildMap = (await import('../../src/build.js')).generateBuildMap;

  let buildMap = await generateBuildMap(config);

  matchSnapshotFileURL(
    buildMap,
    '[YAML Build] - Correct output tree file names'
  );

  matchSnapshotSource(buildMap, '[YAML Build] - Correct output source code');
});
