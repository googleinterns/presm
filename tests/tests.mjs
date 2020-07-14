import {createRequire} from 'module';
const loadViaRequire = createRequire(import.meta.url);

// import test from 'tape';
const test = loadViaRequire('tape');

const {argv} = loadViaRequire('yargs').config({});

// Imports for tests
import testYAMLFile1 from './testfiles/yamlExample.yaml';
import testYAMLFile2 from './testfiles/yamlExample.yml';

test('YAML Loader: Import YAML File', async t => {
  t.plan(2);

  let truthYAMLFile = {
    Employees: [
      {'John Doe': {job: 'SWE', skills: ['python', 'java']}},
      {'Jane Doe': {job: 'SWE', skills: ['java', 'python', 'php']}},
    ],
  };

  t.deepEquals(truthYAMLFile, testYAMLFile1);
  t.deepEquals(truthYAMLFile, testYAMLFile2);
});
