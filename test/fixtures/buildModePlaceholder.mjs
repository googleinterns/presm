import {promises} from 'fs';
import {pathToFileURL} from 'url';
import fs from 'fs';

async function main() {
  const buildURL = pathToFileURL('./dist/test.mjs');
  const buildDir = './dist';

  const buildCode =
    "import ts from 'typescript';\n\
    const tsTarget = `${ts.ScriptTarget.ES2020}`;\n\
    console.log('TS target', tsTarget);";

  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }

  await promises.writeFile(buildURL, buildCode, 'utf8');
}

main();
