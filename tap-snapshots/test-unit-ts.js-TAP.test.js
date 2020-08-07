/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/unit/ts.js TAP TS Unit Tests > Pre-Processor processes input correctly 1`] = `
Object {
  "extension": ".mjs",
  "source": "export const placeholder = 42;\\nexport const placeholder2 = [42, 42, 42];\\n",
}
`

exports[`test/unit/ts.js TAP TS Unit Tests > Pre-Processor processes input correctly 2`] = `
Object {
  "extension": ".mjs",
  "source": "\\"use strict\\";\\nObject.defineProperty(exports, \\"__esModule\\", { value: true });\\nexports.placeholder2 = exports.placeholder = void 0;\\nexports.placeholder = 42;\\nexports.placeholder2 = [42, 42, 42];\\n",
}
`

exports[`test/unit/ts.js TAP TS Unit Tests > Pre-Processor processes input correctly 3`] = `
Object {
  "extension": ".mjs",
  "source": "export const placeholder = 42;\\nexport const placeholder2 = [42, 42, 42];\\nconsole.log(placeholder);\\nconsole.log(placeholder2);\\n",
}
`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Bare Imports] Correct output source code 1`] = `
import * as ts from 'typescript';
console.log(\`Script Target: \${ts.ScriptTarget.ES2020}\`);

`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Bare Imports] Correct output tree file names 1`] = `
Array [
  "file:///{fs}/presm/dist/test/fixtures/ts-build-bare/main.mjs",
]
`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Basic] Correct output source code 1`] = `
const myBear = {
    teeth: 10,
    type: 'grizzly',
    children: [{ teeth: 11, type: 'grizzly', children: [] }],
};
console.log(myBear);

`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Basic] Correct output tree file names 1`] = `
Array [
  "file:///{fs}/presm/dist/test/fixtures/ts-build-simple/main.js",
]
`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Relative Imports] Correct output source code 1`] = `
import mymodule, { numArr } from "/{fs}/presm/test/fixtures/ts-build-relative-imports/mymodule.ts";
console.log(\`Module Name: \${mymodule}\`);
const myNumArr = numArr(5);
console.log(\`My Num Arr: \${myNumArr}\`);

`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Relative Imports] Correct output source code 2`] = `
export default function defaultFunction() {
    const returnStringArr = ['MyModule', 'MyModule', 'MyModule'];
    return returnStringArr;
}
export function numArr(num) {
    const arr = [];
    let c = 0;
    while (c < num) {
        arr.push(c);
        c++;
    }
    return arr;
}

`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Relative Imports] Correct output tree file names 1`] = `
Array [
  "file:///{fs}/presm/dist/test/fixtures/ts-build-relative-imports/main.mjs",
  "file:///{fs}/presm/dist/test/fixtures/ts-build-relative-imports/mymodule.mjs",
]
`
