import fs from 'fs';
import url from 'url';
import path from 'path';

import {rollup} from 'rollup';

import {getSource} from './loader.js';

// Returns outputFileList: list of [Input Tree fileURL, source]
export async function generateOutputFileList(coreInstance) {
  let outputFileList = [];

  async function iterateDir(inputDirString) {
    // Build for all files in the `inputDir`
    const files = await fs.promises.readdir(inputDirString);
    await Promise.all(
      files.map(async file => {
        const inputFileURL = url.pathToFileURL(path.join(inputDirString, file));

        const fileIsDir = fs.lstatSync(inputFileURL).isDirectory();

        if (fileIsDir) {
          // Merge sub-directory outputFileList
          outputFileList = outputFileList.concat(
            await iterateDir(path.join(inputDirString, file))
          );
        } else {
          const outputFileURL = url.pathToFileURL(
            path.join(inputDirString, file)
          );

          const {source} = await getSource(
            inputFileURL.toString(),
            // Temporary 'module' format for everything
            {format: 'module'},
            () => {},
            coreInstance
          );
          outputFileList.push([outputFileURL, source]);
        }
      })
    );

    return outputFileList;
  }
  return await iterateDir(coreInstance.config.inputDir);
}

export async function generateBundleOutputObj(outputFileList) {
  const filenames = outputFileList.map(([inputTreeFileURL]) =>
    url.fileURLToPath(inputTreeFileURL)
  );

  const pluginPRESM = {
    name: 'pluginPRESM',
    resolveId: source => {
      if (filenames.includes(source)) {
        return source;
      }
      return null;
    },
    // If source is in outputFileList, return source code
    load: id => {
      const sourceIdx = outputFileList.findIndex(
        ([inputTreeFileURL]) => url.fileURLToPath(inputTreeFileURL) === id
      );
      if (sourceIdx !== -1) {
        // Return source from outputFileList
        return outputFileList[sourceIdx][1];
      }
      return null;
    },
  };

  const inputOptions = {
    input: filenames,
    plugins: [pluginPRESM],
  };

  let preGenerate = true;

  // The following outputOptions is used twice
  // First to generate the initial bundle with import/export
  //  information for each file
  // Second, using this import/export information
  //  to generate a new bundle with appropriate
  //  output tree specifier references and filenames
  //  See "entryFileNames" hook below
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
  // Populate set isModule needed to determine extensions in second generation
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

export async function writeoutputFileList(outputFileList, coreInstance) {
  // Create output dir
  const outputDirString = path.join(
    coreInstance.outputDir,
    coreInstance.inputDir
  );
  if (!fs.existsSync(outputDirString)) {
    fs.promises.mkdir(outputDirString, {
      recursive: true,
    });
  }

  await Promise.all(
    outputFileList.map(async ([outputFileURL, source]) => {
      fs.promises.writeFile(outputFileURL, source, 'utf8');
    })
  );
}

export async function build() {
  const outputFileList = await generateOutputFileList();
  await writeoutputFileList(outputFileList);
}
