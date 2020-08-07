import tap from 'tap';

import {testPreProcessorExports, batchTest} from '../test-utils.js';

import ts from 'typescript';

import {cleanSnapshot} from '../test-utils.js';

cleanSnapshot();

tap.test('TS Unit Tests', async t => {
  const tsOptionsList = [
    {
      compilerOptions: {
        target: 'esnext',
        module: 'esnext',
      },
    },
    // Disabled the following unit test until TS loader returns relateive path specifiers, not absolute
    // {
    //   compilerOptions: {
    //     target: 'esnext',
    //     module: 'esnext',
    //   },
    // },
    {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.CommonJS,
      },
    },
    {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ES2015,
      },
    },
  ];

  const preProcessorTypeScript = await import(
    '../../examples/loaders/preprocessor-typescript.js'
  );

  await testPreProcessorExports(preProcessorTypeScript, tsOptionsList[0]);

  await batchTest(t, preProcessorTypeScript, tsOptionsList, [
    'test/fixtures/tsmodule1.ts',
    // Disabled the following unit test until TS loader returns relateive path specifiers, not absolute
    // 'test/fixtures/tsmodule2.ts',
    'test/fixtures/tsmodule3.ts',
    'test/fixtures/tsmodule4.ts',
  ]);

  //TS Build Tests
  // - simple transpilation
  // - bare specifier transpilation
  // relative imports transpilation

  let config = (await import('../../src/core.js')).getConfig(
    './test/fixtures/loaderconfig2.json'
  );

  let generateBuildMap = (await import('../../src/build.js')).generateBuildMap;

  let buildMap = await generateBuildMap(config);
  t.matchSnapshot(
    buildMap.map(fileSourcePair => fileSourcePair[0].href),
    '[TS Build - Basic] Correct output tree file names'
  );
  t.matchSnapshot(
    buildMap.map(fileSourcePair => fileSourcePair[1]),
    '[TS Build - Basic] Correct output source code'
  );

  config = (await import('../../src/core.js')).getConfig(
    './test/fixtures/loaderconfig3.json'
  );

  buildMap = await generateBuildMap(config);
  t.matchSnapshot(
    buildMap.map(fileSourcePair => fileSourcePair[0].href),
    '[TS Build - Bare Imports] Correct output tree file names'
  );
  t.matchSnapshot(
    buildMap.map(fileSourcePair => fileSourcePair[1]),
    '[TS Build - Bare Imports] Correct output source code'
  );

  config = (await import('../../src/core.js')).getConfig(
    './test/fixtures/loaderconfig4.json'
  );

  buildMap = await generateBuildMap(config);
  t.matchSnapshot(
    buildMap.map(fileSourcePair => fileSourcePair[0].href),
    '[TS Build - Relative Imports] Correct output tree file names'
  );
  t.matchSnapshot(
    buildMap.map(fileSourcePair => fileSourcePair[1]),
    '[TS Build - Relative Imports] Correct output source code'
  );
});
