import test from 'tape';
import {testPreProcessorExports, batchTest} from '../test-utils.mjs';

import ts from 'typescript';

test('[Unit] TypeScript Loader: ', async t => {
  let preProcessorTypeScript = await import(
    '../../examples/loaders/preprocessor-typescript.mjs'
  );

  let tsOptionsList = [
    {
      compilerOptions: {
        target: 'esnext',
        module: 'esnext',
      },
    },
    {
      compilerOptions: {
        target: 'esnext',
        module: 'esnext',
      },
    },
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

  testPreProcessorExports(t, preProcessorTypeScript, tsOptionsList[0]);

  await batchTest(
    t,
    preProcessorTypeScript,
    tsOptionsList,
    [
      'tests/fixtures/tsmodule1.ts',
      'tests/fixtures/tsmodule2.ts',
      'tests/fixtures/tsmodule3.ts',
      'tests/fixtures/tsmodule4.ts',
    ],
    [
      'tests/fixtures/tsmodule1.mjs',
      'tests/fixtures/tsmodule2.mjs',
      'tests/fixtures/tsmodule3.mjs',
      'tests/fixtures/tsmodule4.mjs',
    ]
  );

  t.end();
});
