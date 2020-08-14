import fs from 'fs';
import url from 'url';
import path from 'path';
import {rollup} from 'rollup';

import {getSource} from './loader.js';

import {Core} from './core.js';

/**
 * Generates an object of input options for Rollup
 * https://rollupjs.org/guide/en/#big-list-of-options
 *
 * @param {object} outputFileList an array of arrays, each with the form: [fileURL: URL, source: string]
 * @returns {object} input options for to be used in rollup(inputOptions)
 */
export function getRollupInputOptions(outputFileList) {
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

/**
 * Generates an object of output options for Rollup
 * https://rollupjs.org/guide/en/#big-list-of-options
 *
 * @param {object} coreInstance an instance of Core class (see src/core)
 * @param {object} prevBundleOutputObj bundle.generate().output object - used to determine extensions
 * @returns {object} output options for to be used in rollup(outputOptions)
 *
 */
export function getRollupOutputOptions(coreInstance, prevBundleOutputObj) {
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

/**
 * Generates a list of file URLs and their source code to process and write to disk
 *
 * @param {object} coreInstance an instance of Core class (see src/core)
 * @param {string} entryFileRelativePath path of file PRESM should process and write to disk
 * @returns {object} an array of arrays, each with the form: [fileURL: URL, source: string]
 *                  if(entryFileRelativePath exists) then this list contains only 1 element
 */
export async function generateOutputFileList(
  coreInstance,
  entryFileRelativePath
) {
  let outputFileList = [];

  if (entryFileRelativePath) {
    const {fileURL, source} = await getSourceFromFileURL(
      entryFileRelativePath,
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

/**
 * Generates a Rollup bundle object, used to generate() and build()
 * https://rollupjs.org/guide/en/#rolluprollup
 *
 * @param {object} outputFileList an array of arrays, each with the form: [fileURL: URL, source: string]
 * @param {object} coreInstance an instance of Core class (see src/core)
 * @returns {objecy} Rollup bundle object
 */
export async function generateBundleObj(outputFileList, coreInstance) {
  // Initialize bundle
  const bundle = await rollup(getRollupInputOptions(outputFileList));

  // Generate bundle using our output options
  let outputOptions = getRollupOutputOptions(coreInstance);
  let {output} = await bundle.generate(outputOptions);

  // Generate final bundle with final output extensions
  outputOptions = getRollupOutputOptions(coreInstance, output);
  ({output} = await bundle.generate(outputOptions));
  return {bundle: bundle, outputOptions: outputOptions, output: output};
}

/**
 * Writes files to disk
 *
 * @param {object} bundle a Rollup bundle object
 * @param {object} outputOptions Rollup output options object, generated in generateBundleObj
 * @returns {boolean} boolean based on sucessfully writing files
 */
export async function writeBundleFiles(bundle, outputOptions) {
  try {
    await bundle.write(outputOptions);
    return true;
  } catch (error) {
    console.log('The following error occurred while writing files: ', error);
    return false;
  }
}

/**
 * Performs the entire build process - writes to disk
 *
 * @param {string} entryFileRelativePath path of file PRESM should process and write to disk
 * @returns {boolean} boolean based on sucessfully writing files
 */
export async function build(entryFileRelativePath) {
  const coreInstance = new Core();
  const outputFileList = await generateOutputFileList(
    coreInstance,
    entryFileRelativePath
  );
  const {bundle, outputOptions} = await generateBundleObj(
    outputFileList,
    coreInstance
  );
  const writtenSucessfully = await writeBundleFiles(bundle, outputOptions);
  return writtenSucessfully;
}
