import tap from 'tap';

import {testPreProcessorExports, batchTest} from '../test-utils.js';

import ts from 'typescript';

import {cleanSnapshot} from '../test-utils.js';

import {Core} from '../../src/core.js';
import {generateOutputFileList, generateBundleObj} from '../../src/build.js';
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
  // - relative imports transpilation

  function matchSnapshotSource(buildMap, msg) {
    buildMap.forEach(fileSourcePair => {
      t.matchSnapshot(fileSourcePair[1], msg);
    });
  }

  function matchSnapshotFileName(bundleOutputObj, msg) {
    t.matchSnapshot(
      bundleOutputObj.map(entry => entry.fileName),
      msg
    );
  }

  // Simple transpilation
  let coreObj = new Core('./test/fixtures/loaderconfig2.json');

  let buildMap = await generateOutputFileList(coreObj);

  let {generatedOutput} = await generateBundleObj(buildMap, coreObj);

  matchSnapshotFileName(
    generatedOutput,
    '[TS Build - Basic] Correct output tree file names'
  );

  matchSnapshotSource(
    buildMap,
    '[TS Build - Basic] Correct output source code'
  );

  // Bare specifier transpilation
  coreObj = new Core('./test/fixtures/loaderconfig3.json');

  buildMap = await generateOutputFileList(coreObj);

  ({generatedOutput} = await generateBundleObj(buildMap, coreObj));

  matchSnapshotFileName(
    generatedOutput,
    '[TS Build - Bare Imports] Correct output tree file names'
  );

  matchSnapshotSource(
    buildMap,
    '[TS Build - Bare Imports] Correct output source code'
  );

  // Relative imports transpilation
  coreObj = new Core('./test/fixtures/loaderconfig4.json');

  buildMap = await generateOutputFileList(coreObj);

  ({generatedOutput} = await generateBundleObj(buildMap, coreObj));

  matchSnapshotFileName(
    generatedOutput,
    '[TS Build - Relative Imports] Correct output tree file names'
  );

  matchSnapshotSource(
    buildMap,
    '[TS Build - Relative Imports] Correct output source code'
  );
});
