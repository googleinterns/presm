import fs from 'fs';
import url from 'url';
import path from 'path';

import {config} from './core.mjs';

import {getSource} from './loader.mjs';

// Returns list of [output Tree fileURL, source]
export async function generateBuildMap() {
  let buildMap = [];

  async function iterateDir(inputDirString) {
    // Create output dir
    const outputDirString = path.join(config.outputDir, inputDirString);
    if (!fs.existsSync(outputDirString)) {
      fs.promises.mkdir(outputDirString, {
        recursive: true,
      });
    }

    // Build for all files in the `inputDir`
    const files = await fs.promises.readdir(inputDirString);
    await Promise.all(
      files.map(async file => {
        const inputFileURL = url.pathToFileURL(path.join(inputDirString, file));

        const fileIsDir = fs.lstatSync(inputFileURL).isDirectory();

        if (fileIsDir) {
          // Merge sub-directory buildMap
          buildMap = buildMap.concat(
            await iterateDir(path.join(inputDirString, file))
          );
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
          buildMap.push([outputFileURL, source]);
        }
      })
    );

    return buildMap;
  }

  return await iterateDir(config.inputDir);
}

export async function writeBuildMap(buildMap) {
  await Promise.all(
    buildMap.map(async ([outputFileURL, source]) => {
      fs.promises.writeFile(outputFileURL, source, 'utf8');
    })
  );
}

async function build() {
  const buildMap = await generateBuildMap();
  await writeBuildMap(buildMap);
}

build();
