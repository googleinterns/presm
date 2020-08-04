import {promises as fs} from 'fs';
import {pathToFileURL} from 'url';

async function main() {
  const buildURL = pathToFileURL('./dist/test.mjs');

  const buildCode =
    "import ts from 'typescript';\n\
    const tsTarget = `${ts.ScriptTarget.ES2020}`;\n\
    console.log('TS target', tsTarget);";

  await fs.writeFile(buildURL, buildCode, 'utf8');
}

main();
