import tap from 'tap';

import ts from 'typescript';

import {cleanSnapshot} from '../test-utils.js';

import {Core} from '../../src/core.js';

cleanSnapshot();

tap.test('Build System Unit Tests', async t => {
  const {
    getRollupInputOptions,
    getRollupOutputOptions,
    generateOutputFileList,
    generateBundleObj,
    writeBundleFiles,
    build,
  } = await import('../../src/build.js');

  let coreInstance = new Core('./test/fixtures/loaderconfig5.json');

  t.matchSnapshot(coreInstance, 'Loader config file read correctly');

  let outputFileList = await generateOutputFileList(coreInstance);
  t.matchSnapshot(outputFileList, 'Output file list generated correctly');

  let inputOptions = await getRollupInputOptions(outputFileList);

  t.matchSnapshot(inputOptions, 'Input options generated correctly');

  let outputOptions = await getRollupOutputOptions(coreInstance);

  t.matchSnapshot(
    outputOptions,
    'Ouput options (initial options) generated correctly'
  );

  let generatedBundleObj = await generateBundleObj(
    outputFileList,
    coreInstance
  );

  t.matchSnapshot(generatedBundleObj, 'Bundle object generated correctly');

  outputOptions = await getRollupOutputOptions(
    coreInstance,
    generatedBundleObj.output
  );

  t.matchSnapshot(
    outputOptions,
    'Ouput options (final options) generated correctly'
  );
});
