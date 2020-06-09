import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const test = require('tape');
import { calc } from './calc.js';
const { argv } = require('yargs').config({});
function modifyTestArgv(op, a, b) {
    delete argv.add;
    delete argv.sub;
    delete argv.div;
    delete argv.mult;
    argv[op] = [a, b];
    return argv;
}
function createCorrectOutput(op, op_symbol, a, b, res) {
    return `${op} ${a}${op_symbol}${b} = ${res}`;
}
test('add test', (t) => {
    t.plan(2);
    const op = 'add';
    const op_symbol = '+';
    let a = 5;
    let b = 10;
    let res = 15;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));
    a = 15;
    b = 0;
    res = 15;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));
});
test('sub test', (t) => {
    t.plan(2);
    const op = 'sub';
    const op_symbol = '-';
    let a = 5;
    let b = 10;
    let res = -5;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));
    a = 15;
    b = 0;
    res = 15;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));
});
test('mult test', (t) => {
    t.plan(2);
    const op = 'mult';
    const op_symbol = '*';
    let a = 5;
    let b = 10;
    let res = 50;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));
    a = 15;
    b = 0;
    res = 0;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));
});
test('div test', (t) => {
    t.plan(2);
    const op = 'div';
    const op_symbol = '/';
    let a = 5;
    let b = 10;
    let res = 0.5;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));
    a = 15;
    b = 0;
    res = 'Infinity';
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));
});
//# sourceMappingURL=tests.js.map