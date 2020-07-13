import {createRequire} from 'module';
const loadViaRequire = createRequire(import.meta.url);

// import test from 'tape';
const test = loadViaRequire('tape');

import {calc} from '../calc/calc.js';

const {argv} = loadViaRequire('yargs').config({});

import {modifyTestArgv, createCorrectOutput} from '../calc/test_functions.ts';

test('Sample calc app tests', (t: {
  plan: (arg0: number) => void;
  equal: (arg0: string, arg1: string) => void;
}) => {
  t.plan(8);

  // Add Tests

  let op = 'add';
  let op_symbol = '+';
  let a = 5;
  let b = 10;
  let res: string | number = 15;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 15;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  // Sub Tests

  op = 'sub';
  op_symbol = '-';
  a = 5;
  b = 10;
  res = -5;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 15;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  // Mult Tests

  op = 'mult';
  op_symbol = '*';
  a = 5;
  b = 10;
  res = 50;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 0;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  // Div Tests

  op = 'div';
  op_symbol = '/';
  a = 5;
  b = 10;
  res = 0.5;
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 'Infinity';
  t.equal(
    calc(modifyTestArgv(argv, op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );
});
