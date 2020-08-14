import fs from 'fs';
import url from 'url';
import path from 'path';
import {rollup} from 'rollup';

import {getSource} from './loader.js';

import {Core} from './core.js';

function getRollupInputOptions(outputFileList) {
  const filePaths = outputFileList.map(([inputTreeFileURL]) =>
    url.fileURLToPath(inputTreeFileURL)
  );

  const pluginPRESM = {
    name: 'pluginPRESM',
    resolveId: source => {
      if (filePaths.includes(source)) {
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
    input: filePaths,
    plugins: [pluginPRESM],
  };
  return inputOptions;
}

function getRollupOutputOptions(coreInstance, prevBundleOutputObj) {
  // Populate set isModule needed to determine extensions in second generation
  const isModule = new Set();
  if (prevBundleOutputObj) {
    prevBundleOutputObj.forEach(chunk => {
      if (chunk.exports.length > 0 || chunk.imports.length > 0) {
        isModule.add(chunk.facadeModuleId);
      }
    });
  }

  // The following outputOptions is used twice
  // First to generate the initial bundle with import/export
  //  information for each file
  // Second, using this import/export information
  //  to generate a new bundle with appropriate
  //  output tree specifier references and filenames
  //  See "entryFileNames" hook below
  const outputOptions = {
    dir: coreInstance.config.outputDir,
    preserveModules: true,
    // Determine extension for output files
    entryFileNames: entry => {
      if (!prevBundleOutputObj) {
        return entry.name;
      } else if (isModule.has(entry.facadeModuleId)) {
        return '[name].mjs';
      } else {
        return '[name].js';
      }
    },
    format: 'esm',
    plugins: [],
  };

  return outputOptions;
}

// Returns outputFileList: list of [Input Tree fileURL, source]
export async function generateOutputFileList(coreInstance, entryFileAbsPath) {
  let outputFileList = [];

  if (entryFileAbsPath) {
    const {fileURL, source} = await getSourceFromFileURL(
      entryFileAbsPath,
      process.cwd()
    );
    return [[fileURL, source]];
  }

  async function getSourceFromFileURL(inputFilePath, inputDirString) {
    const fileURL = url.pathToFileURL(path.join(inputDirString, inputFilePath));
    const {source} = await getSource(
      fileURL.toString(),
      // Temporary 'module' format for everything
      {format: 'module'},
      () => {},
      coreInstance
    );
    return {fileURL: fileURL, source: source};
  }

  async function iterateDir(inputDirString) {
    // Build for all files in the `inputDir`
    const files = await fs.promises.readdir(inputDirString);

    await Promise.all(
      files.map(async file => {
        const inputFilePath = path.join(inputDirString, file);
        const fileIsDir = fs.lstatSync(inputFilePath).isDirectory();

        if (fileIsDir) {
          // Merge sub-directory outputFileList
          outputFileList = outputFileList.concat(
            await iterateDir(inputFilePath)
          );
        } else {
          const {fileURL, source} = await getSourceFromFileURL(
            file,
            inputDirString
          );
          outputFileList.push([fileURL, source]);
        }
      })
    );

    return outputFileList;
  }
  return await iterateDir(coreInstance.config.inputDir);
}

export async function generateBundleObj(outputFileList, coreInstance) {
  // Initialize bundle
  const bundle = await rollup(getRollupInputOptions(outputFileList));

  // Generate bundle using our output options
  let outputOptions = getRollupOutputOptions(coreInstance);
  let {output} = await bundle.generate(outputOptions);

  // Generate final bundle with final output extensions
  outputOptions = getRollupOutputOptions(coreInstance, output);
  ({output} = await bundle.generate(outputOptions));
  return {bundle: bundle, output: output};
}

export async function writeBundleFiles(coreInstance, bundle, generatedOutput) {
  try {
    const outputOptions = getRollupOutputOptions(coreInstance, generatedOutput);
    await bundle.write(outputOptions);
    return true;
  } catch (error) {
    console.log('The following error occurred while building: ', error);
    return false;
  }
}

export async function build(entryFileAbsPath) {
  const coreInstance = new Core();
  const outputFileList = await generateOutputFileList(
    coreInstance,
    entryFileAbsPath
  );
  const {bundle, output} = await generateBundleObj(
    outputFileList,
    coreInstance
  );
  const writtenSucessfully = await writeBundleFiles(
    coreInstance,
    bundle,
    output
  );
  return writtenSucessfully;
}
