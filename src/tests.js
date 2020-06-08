import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let test = require('tape');

import { ops_list } from "./ops.js"

test('add test', function (t) {
    t.plan(2);

    t.equal(ops_list["add"](5,10), 15);

    t.equal(ops_list["add"](150,0), 150);
});

test('sub test', function (t) {
    t.plan(2);

    t.equal(ops_list["sub"](5,10), -5);

    t.equal(ops_list["sub"](150,0), 150);
});

test('mult test', function (t) {
    t.plan(2);

    t.equal(ops_list["mult"](5,10), 50);

    t.equal(ops_list["mult"](150,0), 0);
});

test('div test', function (t) {
    t.plan(2);

    t.equal(ops_list["div"](5,10), 0.5);

    t.equal(ops_list["div"](0,150), 0);
});