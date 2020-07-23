/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/unit/ts.mjs TAP TS Unit Tests > Pre-Processor processes input correctly 1`] = `
Object {
  "extension": ".mjs",
  "source": "export const dummy = 42;\\nexport const dummy2 = [42, 42, 42];\\n",
}
`

exports[`test/unit/ts.mjs TAP TS Unit Tests > Pre-Processor processes input correctly 2`] = `
Object {
  "extension": ".mjs",
  "source": "import { dummy } from \\"../fixtures/tsmodule1.ts\\";\\nconsole.log(dummy);\\n",
}
`

exports[`test/unit/ts.mjs TAP TS Unit Tests > Pre-Processor processes input correctly 3`] = `
Object {
  "extension": ".mjs",
  "source": "\\"use strict\\";\\nObject.defineProperty(exports, \\"__esModule\\", { value: true });\\nexports.dummy2 = exports.dummy = void 0;\\nexports.dummy = 42;\\nexports.dummy2 = [42, 42, 42];\\n",
}
`

exports[`test/unit/ts.mjs TAP TS Unit Tests > Pre-Processor processes input correctly 4`] = `
Object {
  "extension": ".mjs",
  "source": "export const dummy = 42;\\nexport const dummy2 = [42, 42, 42];\\nconsole.log(dummy);\\nconsole.log(dummy2);\\n",
}
`
