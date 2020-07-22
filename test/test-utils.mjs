import {promises as fs} from 'fs';
import url from 'url';
import assert from 'assert';
import tap from 'tap';

export async function pathToRawSource(absPath) {
  let fileURL = url.pathToFileURL(absPath);
  return fs.readFile(new URL(fileURL), 'utf8');
}

// Tests exports that all Pre-Processors should have
export function testPreProcessorExports(preprocessor, options) {
  tap.has(
    preprocessor,
    {
      sourceExtensionTypes: Array,
    },
    'Exports sourceExtensionTypes'
  );

  tap.has(
    preprocessor,
    {
      outputExtensionTypes: Array,
    },
    'Exports outputExtensionTypes'
  );

  tap.has(
    preprocessor,
    {
      getPreProcessor: Function,
    },
    'Exports getPreProcessor'
  );

  let preprocessorInstance = preprocessor.getPreProcessor(options);
  tap.has(
    preprocessorInstance,
    {
      process: Function,
    },
    'Exports process()'
  );

  return;
}

/**
 * Takes input files and asserts that they match output files after
 * being processed by the "processor"
 *
 * @param processor A Pre- or Post- Processor object
 * @param options Options passed to the "process", see loaderconfig.mjs
 * @param inputs List of input source files to process
 */
export async function batchTest(processor, options, inputs) {
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

    let urlToProcess = url.pathToFileURL(inputs[testIdx]).toString();
    let processedOutput = await processorInstance.process(
      rawSource,
      urlToProcess
    );
    tap.matchSnapshot(
      processedOutput,
      `Pre-Processor processes input correctly`
    );
  }

  return;
}

const fsAbsolutePathRegex = new RegExp(process.cwd(), 'gm');

// Changes file:///path/to/presm/...
// to file:///{fs}/presm/...
export let cleanSnapshot = () =>
  (tap.cleanSnapshot = snapshot => {
    return snapshot.replace(fsAbsolutePathRegex, '/{fs}/presm');
  });
