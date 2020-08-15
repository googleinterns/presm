import tap from 'tap';
import url from 'url';

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

  let coreInstance;

  t.test('Core class', async t => {
    coreInstance = new Core('./test/fixtures/loaderconfig5.json');
    t.ok(coreInstance.config, 'Loader config file read sucessfully');

    t.resolves(
      coreInstance.resourceProviders,
      'Resource Providers resolves to list sucessfully'
    );
    t.resolves(
      coreInstance.preProcessors,
      'Pre-processors resolves to list sucessfully'
    );
    t.resolves(
      coreInstance.postProcessors,
      'Post-processors resolves to list sucessfully'
    );
  });

  let outputFileList;
  t.test('Output file list', async t => {
    outputFileList = await generateOutputFileList(coreInstance);
    t.ok(outputFileList, 'Output file list generated');
    t.ok(
      Array.isArray(outputFileList) && Array.isArray(outputFileList[0]),
      'Output file list correct structure'
    );
    const [fileURL, fileSource] = outputFileList[0];
    t.matchSnapshot(
      fileURL.toString(),
      'Output file list fileURL points to correct resource '
    );
    t.matchSnapshot(fileSource, 'Output file list source correctly passed');
  });

  t.test('Rollup options generation', async t => {
    let inputOptions = await getRollupInputOptions(outputFileList);

    t.ok(inputOptions, 'Input options generated');

    t.ok(inputOptions.input, 'Input options have required input field');

    let outputOptions = await getRollupOutputOptions(coreInstance);

    t.ok(outputOptions, 'Output options (initial options) generated');

    t.ok(
      outputOptions.preserveModules ? outputOptions.dir : outputOptions.file,
      'Output options have required output direcrtory or file'
    );
  });

  t.test('Rollup bundle generation', async t => {
    let {bundle, outputOptions, generatedOutput} = await generateBundleObj(
      outputFileList,
      coreInstance
    );
    t.ok(bundle && generatedOutput, 'Rollup bundle generated');

    outputOptions = await getRollupOutputOptions(coreInstance, generatedOutput);
    t.ok(outputOptions, 'Output options (final options) generated');

    generatedOutput.forEach(rollupFileObj => {
      if (
        rollupFileObj.exports.length > 0 ||
        rollupFileObj.imports.length > 0
      ) {
        t.ok(
          rollupFileObj.fileName.endsWith('.mjs'),
          `ESM module file (${rollupFileObj.fileName}) denoted with proper extension`
        );
      } else {
        t.ok(
          !rollupFileObj.fileName.endsWith('.mjs'),
          `Non-ESM module file (${rollupFileObj.fileName}) denoted with proper extension`
        );
      }
    });
  });
});
