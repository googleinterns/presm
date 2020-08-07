import tap from 'tap';

import {testPreProcessorExports, batchTest} from '../test-utils.js';

tap.test('YAML Unit Tests', async t => {
  const optionsYAML = {};
  const preProcessorYAML = await import(
    '../../examples/loaders/preprocessor-yaml.js'
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
