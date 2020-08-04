import fs from 'fs';
import url from 'url';
import path from 'path';

import {config} from './core.mjs';

import {getSource} from './loader.mjs';

console.log(process.env.hi);

export async function build() {
  async function iterateDir(inputDirString) {
    // Create output dir
    const outputDirString = path.join(config.outputDir, inputDirString);
    if (!fs.existsSync(outputDirString)) {
      fs.promises.mkdir(outputDirString, {
        recursive: true,
      });
    }

    // Build for all files in the `inputDir`
    fs.readdir(inputDirString, async (err, files) => {
      if (err) {
        return console.log(err);
      }
      files.forEach(async file => {
        const inputFileURL = url.pathToFileURL(path.join(inputDirString, file));

        const fileIsDir = fs.lstatSync(inputFileURL).isDirectory();

        if (fileIsDir) {
          iterateDir(path.join(inputDirString, file));
        } else {
          const outputFileURL = url.pathToFileURL(
            path.join(config.outputDir, inputDirString, file)
          );

          const {source} = await getSource(
            inputFileURL.toString(),
            // Temporary 'module' format for everything
            {format: 'module'},
            () => {}
          );

          await fs.promises.writeFile(outputFileURL, source, 'utf8');
        }
      });
    });
  }

  await iterateDir(config.inputDir);
}

build();
