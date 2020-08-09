import fs from 'fs';
import url from 'url';
import path from 'path';

import {rollup} from 'rollup';

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
            path.join(/*configObj.outputDir,*/ inputDirString, file)
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

export async function generateBundleOutputObj(buildMap) {
  const filenames = buildMap.map(buildPair => buildPair[0].pathname);

  function PRESMPlugin() {
    return {
      name: 'PRESMPlugin',
      resolveId(source) {
        if (filenames.includes(source)) {
          return source;
        }
        return null;
      },
      // If source is in buildmap, return source code
      load(id) {
        const sourceArr = buildMap.filter(
          buildPair => buildPair[0].pathname === id
        );
        if (sourceArr) {
          return sourceArr[0][1];
        }
        return null;
      },
    };
  }

  const inputOptions = {
    input: filenames,
    plugins: [PRESMPlugin()],
  };

  let preGenerate = true;

  const outputOptions = {
    dir: 'dist',
    preserveModules: true,
    // Determine extension for output files
    entryFileNames: entry => {
      if (preGenerate) {
        return entry.name;
      }
      if (isModule.has(entry.facadeModuleId)) {
        return '[name].mjs';
      } else {
        return '[name].js';
      }
    },
    format: 'esm',
    plugins: [],
  };

  // Initialize bundle
  const bundle = await rollup(inputOptions);
  // Generate bundle using our output options
  let {output} = await bundle.generate(outputOptions);
  const isModule = new Set();
  // Populate set isModule needed to determine extensions
  output.forEach(chunk => {
    if (chunk.exports.length > 0 || chunk.imports.length > 0) {
      isModule.add(chunk.facadeModuleId);
    }
  });
  preGenerate = false;

  // Generate final bundle with final output extensions
  ({output} = await bundle.generate(outputOptions));
  return output;
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
