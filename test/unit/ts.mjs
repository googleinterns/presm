import {testPreProcessorExports, batchTest} from '../test-utils.mjs';

import ts from 'typescript';

async function main() {
  try {
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

    let preProcessorTypeScript = await import(
      '../../examples/loaders/preprocessor-typescript.mjs'
    );

    await testPreProcessorExports(preProcessorTypeScript, tsOptionsList[0]);

    await batchTest(
      preProcessorTypeScript,
      tsOptionsList,
      [
        'test/fixtures/tsmodule1.ts',
        'test/fixtures/tsmodule2.ts',
        'test/fixtures/tsmodule3.ts',
        'test/fixtures/tsmodule4.ts',
      ]
    );
  } catch (error) {
    console.log(error);
  }
}

main();
