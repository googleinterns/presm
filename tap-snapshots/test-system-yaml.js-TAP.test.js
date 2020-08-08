/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/system/yaml.js TAP YAML System Tests > [YAML Build] - Correct output source code 1`] = `
import yamlFile from './yamlExample.js';

console.log('YAML as JSON: \\n', yamlFile);

`

exports[`test/system/yaml.js TAP YAML System Tests > [YAML Build] - Correct output source code 2`] = `
export default {"Employees":[{"John Doe":{"job":"SWE","skills":["python","java"]}},{"Jane Doe":{"job":"SWE","skills":["java","python","php"]}}]}
`

exports[`test/system/yaml.js TAP YAML System Tests > [YAML Build] - Correct output tree file names 1`] = `
Array [
  "file:///{fs}/presm/dist/test/fixtures/yaml-build-basic/main.mjs",
  "file:///{fs}/presm/dist/test/fixtures/yaml-build-basic/yamlExample.js",
]
`

exports[`test/system/yaml.js TAP YAML System Tests > must match snapshot 1`] = `
### Resolving resource in basic resourceProvider for file:///{fs}/presm/test/fixtures/yamlTest.js

### Getting resource in basic resourceProvider for file:///{fs}/presm/test/fixtures/yamlTest.js

### Resolving resource in basic resourceProvider for ./yamlExample.yaml

### Getting resource in basic resourceProvider for file:///{fs}/presm/test/fixtures/yamlExample.yaml

This is my YAML file import
{ Employees: [ { 'John Doe': [Object] }, { 'Jane Doe': [Object] } ] }
This line was added by a post processor!!

`
