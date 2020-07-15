import test from 'tape';

import {testPreProcessorExports, batchTest} from '../test-utils.mjs';

test('[Unit] YAML Loader: ', async t => {
  let preProcessorYAML = await import(
    '../../examples/loaders/preprocessor-yaml.mjs'
  );

  let optionsYAML = {};

  testPreProcessorExports(t, preProcessorYAML, optionsYAML);

  await batchTest(
    t,
    preProcessorYAML,
    optionsYAML,
    ['tests/fixtures/yamlExample.yaml'],
    ['tests/fixtures/yamlExample.json'],
    'Converts YAML to JSON correctly'
  );

  t.end();
});
