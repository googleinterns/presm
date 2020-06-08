import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let test = require('tape');

import { calc } from "./calc.js"

let {argv} = require('yargs').config({});

function modifyTestArgv(op, a, b){
    delete argv.add;
    delete argv.sub;
    delete argv.div;
    delete argv.mult;
    argv[op] = [a, b];
    return argv
}


function createCorrectOutput(op, op_symbol, a, b, res){
    return `${op} ${a}${op_symbol}${b} = ${res}`
}

test('add test', function (t) {
    t.plan(2);

    let op = "add";
    let op_symbol = "+"
    let a = 5;
    let b = 10;
    let res = 15;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));

    a = 15;
    b = 0;
    res = 15;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol, a, b, res));
});

test('sub test', function (t) {
    t.plan(2);

    let op = "sub";
    let op_symbol = "-"
    let a = 5;
    let b = 10;
    let res = -5;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol,a, b, res));

    a = 15;
    b = 0;
    res = 15;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol,a, b, res));
});

test('mult test', function (t) {
    t.plan(2);

    let op = "mult";
    let op_symbol = "*"
    let a = 5;
    let b = 10;
    let res = 50;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol,a, b, res));

    a = 15;
    b = 0;
    res = 0;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol,a, b, res));
});

test('div test', function (t) {
    t.plan(2);

    let op = "div";
    let op_symbol = "/"
    let a = 5;
    let b = 10;
    let res = 0.5;
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol,a, b, res));

    a = 15;
    b = 0;
    res = "Infinity";
    t.equal(calc(modifyTestArgv(op, a, b)), createCorrectOutput(op, op_symbol,a, b, res));
});