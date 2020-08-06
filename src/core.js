import dotenv from 'dotenv';
dotenv.config();

import {pathToRawSource} from './utils.js';
export const config = JSON.parse(await pathToRawSource(process.env.LOADER_CONFIG));

// Load all resourceProviders, preProcessors, and postProcessors as specified in config file

export const resourceProviders = await Promise.all(
  config.resourceProviders.map((resourceProvider, i) =>
    import(resourceProvider.type)
  )
);

export const preProcessors = await Promise.all(
  config.preProcessors.map(
    (preProcessor, i) =>
      new Promise(async (resolve, reject) => {
        const module = await import(preProcessor.name);
        resolve({
          module: module,
          options: preProcessor.options,
        });
      })
  )
);

export const postProcessors = await Promise.all(
  config.postProcessors.map(
    (postProcessor, i) =>
      new Promise(async (resolve, reject) => {
        const module = await import(postProcessor.name);
        resolve({
          module: module,
          options: postProcessor.options,
        });
      })
  )
);
