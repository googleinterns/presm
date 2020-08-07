import fs from 'fs';
import url from 'url';
import path from 'path';

import {getSource} from './loader.js';

// Returns list of [output Tree fileURL, source]
export async function generateBuildMap(configObj) {
  let buildMap = [];

  async function iterateDir(inputDirString) {
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
            path.join(configObj.outputDir, inputDirString, file)
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
  return await iterateDir(configObj.inputDir);
}

export async function writeBuildMap(buildMap, configObj) {
  // Create output dir
  const outputDirString = path.join(configObj.outputDir, configObj.inputDir);
  if (!fs.existsSync(outputDirString)) {
    fs.promises.mkdir(outputDirString, {
      recursive: true,
    });
  }

  await Promise.all(
    buildMap.map(async ([outputFileURL, source]) => {
      fs.promises.writeFile(outputFileURL, source, 'utf8');
    })
  );
}

export async function build() {
  const buildMap = await generateBuildMap();
  await writeBuildMap(buildMap);
}
