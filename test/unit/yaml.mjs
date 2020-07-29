import tap from 'tap';

import {testPreProcessorExports, batchTest} from '../test-utils.mjs';

tap.test('YAML Unit Tests', async t => {
  const optionsYAML = {};
  const preProcessorYAML = await import(
    '../../examples/loaders/preprocessor-yaml.mjs'
  );

  await testPreProcessorExports(preProcessorYAML, optionsYAML);

  await batchTest(
    t,
    preProcessorYAML,
    optionsYAML,
    ['test/fixtures/yamlExample.yaml'],
    'Converts YAML to JSON correctly'
  );
});
