import {createRequire} from 'module';
const loadViaRequire = createRequire(import.meta.url);

// import test from 'tape';
const test = loadViaRequire('tape');

import {moduleWrapper} from '../src/utils.mjs';
import {promises as fs} from 'fs';
import url from 'url';

// Tests exports that all Pre-Processors should have
// Returns insatnce of getPreProcessor if successful
function testPreProcessorExports(t, preprocessor, options) {
  t.ok(preprocessor.sourceExtensionTypes, 'Exports sourceExtensionTypes');
  t.ok(preprocessor.outputExtensionTypes, 'Exports outputExtensionTypes');
  t.ok(preprocessor.getPreProcessor, 'Exports getPreProcessor()');

  let preprocessorInstance = preprocessor.getPreProcessor(options);
  t.ok(preprocessorInstance.process, 'Exports process()');

  return preprocessorInstance;
}

test('[Unit] YAML Loader: ', async t => {
  let preProcessorYAML = await import(
    '../examples/loaders/preprocessor-yaml.mjs'
  );

  let preProcessorYAMLInstance = testPreProcessorExports(
    t,
    preProcessorYAML,
    {}
  );

  let urlYAML = url.pathToFileURL('./tests/testfiles/yamlExample.yaml');
  let rawYAMLSource = await fs.readFile(new URL(urlYAML), 'utf8');

  let jsonYAMLOutput = (await preProcessorYAMLInstance.process(rawYAMLSource))
    ?.source;

  let truthYAMLJSON = moduleWrapper(
    JSON.stringify({
      Employees: [
        {'John Doe': {job: 'SWE', skills: ['python', 'java']}},
        {'Jane Doe': {job: 'SWE', skills: ['java', 'python', 'php']}},
      ],
    })
  );

  t.deepEquals(
    truthYAMLJSON,
    jsonYAMLOutput,
    'Converts YAML to JSON correctly'
  );

  t.end();
});
