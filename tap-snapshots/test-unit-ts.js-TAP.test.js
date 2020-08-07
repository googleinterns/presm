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
Array [
  "import * as ts from 'typescript';\\nconsole.log(\`Script Target: \${ts.ScriptTarget.ES2020}\`);\\n\\nconsole.log('This line was added by a post processor!!');",
]
`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Bare Imports] Correct output tree file names 1`] = `
Array [
  "file:///{fs}/presm/dist/test/fixtures/ts-build-bare/main.mjs",
]
`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Relative Imports] Correct output source code 1`] = `
Array [
  "import mymodule, { numArr } from \\"/{fs}/presm/test/fixtures/ts-build-relative-imports/mymodule.ts\\";\\nconsole.log(\`Module Name: \${mymodule}\`);\\nconst myNumArr = numArr(5);\\nconsole.log(\`My Num Arr: \${myNumArr}\`);\\n\\nconsole.log('This line was added by a post processor!!');",
  "export default function defaultFunction() {\\n    const returnStringArr = ['MyModule', 'MyModule', 'MyModule'];\\n    return returnStringArr;\\n}\\nexport function numArr(num) {\\n    const arr = [];\\n    let c = 0;\\n    while (c < num) {\\n        arr.push(c);\\n        c++;\\n    }\\n    return arr;\\n}\\n\\nconsole.log('This line was added by a post processor!!');",
]
`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Relative Imports] Correct output tree file names 1`] = `
Array [
  "file:///{fs}/presm/dist/test/fixtures/ts-build-relative-imports/main.mjs",
  "file:///{fs}/presm/dist/test/fixtures/ts-build-relative-imports/mymodule.mjs",
]
`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Basic] Correct output source code 1`] = `
Array [
  "const myBear = {\\n    teeth: 10,\\n    type: 'grizzly',\\n    children: [{ teeth: 11, type: 'grizzly', children: [] }],\\n};\\nconsole.log(myBear);\\n\\nconsole.log('This line was added by a post processor!!');",
]
`

exports[`test/unit/ts.js TAP TS Unit Tests > [TS Build - Basic] Correct output tree file names 1`] = `
Array [
  "file:///{fs}/presm/dist/test/fixtures/ts-build-simple/main.js",
]
`
