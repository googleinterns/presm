import { createRequire } from 'module';
const loadViaRequire = createRequire(import.meta.url);

import test from 'tape';

import { calc } from './calc.js';

const { argv } = loadViaRequire('yargs').config({});

function modifyTestArgv(op: string, a: number, b: number) {
  delete argv.add;
  delete argv.sub;
  delete argv.div;
  delete argv.mult;
  argv[op] = [a, b];
  return argv;
}

function createCorrectOutput(op: string, op_symbol: string, a: number, b: number, res: (number | string)): string {
  return `${op} ${a}${op_symbol}${b} = ${res}`;
}

test('add test', (t: { plan: (arg0: number) => void; equal: (arg0: string, arg1: string) => void; }) => {
  t.plan(2);

  const op = 'add';
  const op_symbol = '+';
  let a = 5;
  let b = 10;
  let res = 15;
  t.equal(
    calc(modifyTestArgv(op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 15;
  t.equal(
    calc(modifyTestArgv(op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );
});

test('sub test', (t: { plan: (arg0: number) => void; equal: (arg0: string, arg1: string) => void; }) => {
  t.plan(2);

  const op = 'sub';
  const op_symbol = '-';
  let a = 5;
  let b = 10;
  let res = -5;
  t.equal(
    calc(modifyTestArgv(op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 15;
  t.equal(
    calc(modifyTestArgv(op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );
});

test('mult test', (t: { plan: (arg0: number) => void; equal: (arg0: string, arg1: string) => void; }) => {
  t.plan(2);

  const op = 'mult';
  const op_symbol = '*';
  let a = 5;
  let b = 10;
  let res = 50;
  t.equal(
    calc(modifyTestArgv(op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 0;
  t.equal(
    calc(modifyTestArgv(op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );
});

test('div test', (t: { plan: (arg0: number) => void; equal: (arg0: string, arg1: string) => void; }) => {
  t.plan(2);

  const op = 'div';
  const op_symbol = '/';
  let a = 5;
  let b = 10;
  let res: (string | number) = 0.5;
  t.equal(
    calc(modifyTestArgv(op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );

  a = 15;
  b = 0;
  res = 'Infinity';
  t.equal(
    calc(modifyTestArgv(op, a, b)),
    createCorrectOutput(op, op_symbol, a, b, res)
  );
});
