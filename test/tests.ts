import {createRequire} from 'module';
const loadViaRequire = createRequire(import.meta.url);

const test = loadViaRequire('tape');

import {calc} from '../examples/calc/calc';

const {argv} = loadViaRequire('yargs').config({});

import {modifyTestArgv, createCorrectOutput} from '../examples/calc/test_functions';

// Imports for tests
import testYAMLFile1 from './fixtures/yamlExample.yaml';
import testYAMLFile2 from './fixtures/yamlExample.yml';

test('YAML Loader: Import YAML File', async (t: any) => {
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

test('Import resolution tests', async (t: any) => {
  t.plan(2);

  let {placeholder} = await import('./fixtures/tsmodule1');
  t.equal(placeholder, 42);

  let {placeholder2} = await import('./fixtures/tsmodule1.js');
  t.equal(placeholder2, 42);
});

test('Sample calc app tests', (t: any) => {
  t.plan(8);

  // Add Tests

  let op = 'add';
  let opSymbol = '+';
  let a = 5;
  let b = 10;
  let res: string | number = 15;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, opSymbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 15;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, opSymbol, a, b, res)
  );

  // Sub Tests

  op = 'sub';
  opSymbol = '-';
  a = 5;
  b = 10;
  res = -5;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, opSymbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 15;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, opSymbol, a, b, res)
  );

  // Mult Tests

  op = 'mult';
  opSymbol = '*';
  a = 5;
  b = 10;
  res = 50;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, opSymbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 0;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, opSymbol, a, b, res)
  );

  // Div Tests

  op = 'div';
  opSymbol = '/';
  a = 5;
  b = 10;
  res = 0.5;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, opSymbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 'Infinity';
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, opSymbol, a, b, res)
  );
});
