import {createRequire} from 'module';
const loadViaRequire = createRequire(import.meta.url);

// import test from 'tape';
const test = loadViaRequire('tape');

import {moduleWrapper} from '../src/utils.mjs';
import {promises as fs} from 'fs';
import url from 'url';
import assert from 'assert';

// Tests exports that all Pre-Processors should have
function testPreProcessorExports(t, preprocessor, options) {
  t.ok(preprocessor.sourceExtensionTypes, 'Exports sourceExtensionTypes');
  t.ok(preprocessor.outputExtensionTypes, 'Exports outputExtensionTypes');
  t.ok(preprocessor.getPreProcessor, 'Exports getPreProcessor()');

  let preprocessorInstance = preprocessor.getPreProcessor(options);
  t.ok(preprocessorInstance.process, 'Exports process()');

  return true;
}

/**
 * Takes input files and asserts that they match output files after
 * being processed by the "processor"
 *
 * @param t The Tape object
 * @param processor A Pre- or Post- Processor object
 * @param options Options passed to the "process", see loaderconfig.mjs
 * @param inputs List of input source files to processor
 * @param outputs List of output source files to assert equivalency against
 * NOTE: inputs and outputs must be the same length
 */
async function batchTest(t, processor, options, inputs, outputs) {
  assert.equal(inputs.length, outputs.length);
  options = Array.isArray(options)
    ? options
    : Array(inputs.length).fill(options);

  let numTests = inputs.length;

  assert.equal(options.length, numTests);

  for (let testIdx = 0; testIdx < numTests; testIdx++) {
    let processorInstance = processor.getPreProcessor(options[testIdx]);

    let rawTSSource = await pathToRawSource(inputs[testIdx]);
    let rawTSOutput = await pathToRawSource(outputs[testIdx]);

    let urlToProcess = url.pathToFileURL(inputs[testIdx]).toString();
    let transpiledTSOutput = (
      await processorInstance.process(rawTSSource, urlToProcess)
    )?.source;

    t.deepEquals(
      transpiledTSOutput,
      rawTSOutput,
      `Transpiles TS to JS correctly, TestID: ${testIdx + 1}`
    );
  }
}

async function pathToRawSource(path) {
  let pathURL = url.pathToFileURL(path);
  return fs.readFile(new URL(pathURL), 'utf8');
}

test('[Unit] YAML Loader: ', async t => {
  let preProcessorYAML = await import(
    '../examples/loaders/preprocessor-yaml.mjs'
  );

  let optionsYAML = {};

  testPreProcessorExports(t, preProcessorYAML, optionsYAML);

  await batchTest(
    t,
    preProcessorYAML,
    optionsYAML,
    ['./tests/testfiles/yamlExample.yaml'],
    ['./tests/testfiles/yamlExample.json']
  );

  t.end();
});

test('[Unit] TypeScript Loader: ', async t => {
  let preProcessorTypeScript = await import(
    '../examples/loaders/preprocessor-typescript.mjs'
  );

  let tsOptions = {
    compilerOptions: {
      target: 'esnext',
      module: 'esnext',
    },
  };

  testPreProcessorExports(t, preProcessorTypeScript, tsOptions);

  await batchTest(
    t,
    preProcessorTypeScript,
    tsOptions,
    ['./tests/testfiles/tsmodule1.ts', './tests/testfiles/tsmodule2.ts'],
    ['./tests/testfiles/tsmodule1.mjs', './tests/testfiles/tsmodule2.mjs']
  );

  t.end();
});
