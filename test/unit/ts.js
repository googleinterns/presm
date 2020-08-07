import tap from 'tap';

import {testPreProcessorExports, batchTest} from '../test-utils.js';

import ts from 'typescript';

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
});