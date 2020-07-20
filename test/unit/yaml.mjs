import {testPreProcessorExports, batchTest} from '../test-utils.mjs';

async function main() {
  try {
    let optionsYAML = {};
    let preProcessorYAML = await import(
      '../../examples/loaders/preprocessor-yaml.mjs'
    );

    await testPreProcessorExports(preProcessorYAML, optionsYAML);

    await batchTest(
      preProcessorYAML,
      optionsYAML,
      ['test/fixtures/yamlExample.yaml'],
      'Converts YAML to JSON correctly'
    );
  } catch (error) {
    console.log(error);
  }
}

main();
