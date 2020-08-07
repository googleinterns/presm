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

exports[`test/unit/ts.js TAP TS Unit Tests > TS Build Tree contains correct output source 1`] = `
Array [
  "const myBear = {\\n    teeth: 10,\\n    type: 'grizzly',\\n    children: [{ teeth: 11, type: 'grizzly', children: [] }],\\n};\\nconsole.log(myBear);\\n\\nconsole.log('This line was added by a post processor!!');",
]
`

exports[`test/unit/ts.js TAP TS Unit Tests > TS Build Tree contains correct output tree file names 1`] = `
Array [
  "file:///{fs}/presm/dist/test/fixtures/ts-build1/main.js",
]
`
