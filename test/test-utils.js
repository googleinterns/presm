import fs from 'fs';
import url from 'url';
import tap from 'tap';

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

  const preprocessorInstance = preprocessor.getPreProcessor(options);
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
 * @param t The TAP object, used to create sub-tests
 * @param processor A Pre- or Post- Processor object
 * @param options Options passed to the "process", see loaderconfig.mjs
 * @param inputs List of input source files to process
 */
export async function batchTest(t, processor, options, inputs) {
  const optionsList = Array.isArray(options)
    ? options
    : Array(inputs.length).fill(options);

  const numTests = inputs.length;

  t.assert(
    optionsList.length === numTests,
    '# of options does not match # of tests'
  );

  for (let testIdx = 0; testIdx < numTests; testIdx++) {
    const processorInstance = processor.getPreProcessor(optionsList[testIdx]);

    const rawSource = await fs.promises.readFile(inputs[testIdx], 'utf8');

    const urlToProcess = url.pathToFileURL(inputs[testIdx]).toString();
    const processedOutput = await processorInstance.process(
      rawSource,
      urlToProcess
    );
    t.matchSnapshot(processedOutput, 'Pre-Processor processes input correctly');
  }

  return;
}

const fsAbsolutePathRegex = new RegExp(process.cwd(), 'gm');

// Changes file:///path/to/presm/...
// to file:///{fs}/presm/...
export const cleanSnapshot = () =>
  (tap.cleanSnapshot = snapshot => {
    return snapshot.replace(fsAbsolutePathRegex, '/{fs}/presm');
  });
