import {promises as fs} from 'fs';
import url from 'url';
import assert from 'assert';
import path from 'path';

export async function pathToRawSource(absPath) {
  let fileURL = url.pathToFileURL(absPath);
  return fs.readFile(new URL(fileURL), 'utf8');
}

// Tests exports that all Pre-Processors should have
export function testPreProcessorExports(t, preprocessor, options) {
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
export async function batchTest(t, processor, options, inputs, outputs, msg) {
  assert.equal(
    inputs.length,
    outputs.length,
    '# of input files does not match # of output files'
  );
  options = Array.isArray(options)
    ? options
    : Array(inputs.length).fill(options);

  let numTests = inputs.length;

  assert.equal(
    options.length,
    numTests,
    '# of options does not match # of tests'
  );

  for (let testIdx = 0; testIdx < numTests; testIdx++) {
    let processorInstance = processor.getPreProcessor(options[testIdx]);

    let rawSource = await pathToRawSource(inputs[testIdx]);
    let rawOutput = await pathToRawSource(outputs[testIdx]);

    let urlToProcess = url.pathToFileURL(inputs[testIdx]).toString();
    let processedOutput = (
      await processorInstance.process(rawSource, urlToProcess)
    )?.source;

    t.deepEquals(processedOutput, rawOutput, `${msg}, TestID: ${testIdx + 1}`);
  }
}
