import dotenv from 'dotenv';
dotenv.config();

import {getSourceFromPathSync} from './utils.js';
export const getConfig = pathToConfig =>
  JSON.parse(getSourceFromPathSync(pathToConfig));

const config = getConfig(process.env.LOADER_CONFIG || './loaderconfig.json');
// Load all resourceProviders, preProcessors, and postProcessors as specified in config file

export const resourceProviders = (async () => {
  return await Promise.all(
    config.resourceProviders.map((resourceProvider, i) =>
      import(resourceProvider.type)
    )
  );
})();

export const preProcessors = (async () => {
  return await Promise.all(
    config.preProcessors.map(async (preProcessor, i) => {
      return {
        module: await import(preProcessor.name),
        options: preProcessor.options,
      };
    })
  );
})();

export const postProcessors = (async () => {
  return await Promise.all(
    config.postProcessors.map(async (postProcessor, i) => {
      return {
        module: await import(postProcessor.name),
        options: postProcessor.options,
      };
    })
  );
})();
