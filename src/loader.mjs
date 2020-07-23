import dotenv from 'dotenv';
dotenv.config();

import {isWrappedModule, pathToRawSource} from './utils.mjs';
const config = JSON.parse(await pathToRawSource(process.env.LOADER_CONFIG));

// Load all resourceProviders, preProcessors, and postProcessors as specified in config file

const resourceProviders = await Promise.all(
  config.resourceProviders.map((resourceProvider, i) =>
    import(resourceProvider.type)
  )
);

const preProcessors = await Promise.all(
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

const postProcessors = await Promise.all(
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

export const resolve = resourceProviders[0].resolve;

// Basic getFormat
export async function getFormat(url, context, defaultGetFormat) {
  if (url.startsWith('nodejs')) {
    return {
      format: 'builtin',
    };
  } else if (url.includes('node-spawn-wrap') || url.includes('node_modules')) {
    return {format: 'commonjs'};
  }
  return {
    format: 'module',
  };
}

// This getSource hook executes chained resourceProviders, preProcessors, and postProcessors
export async function getSource(url, context, defaultGetSource) {
  const {format} = context;

  let source;
  let sourceIsWrappedModule = false;

  // Get source using any resouce preovider that accepts this type of URL ("file:")
  for (const resourceProvider of resourceProviders) {
    if (resourceProvider.prefixes.some(prefix => url.startsWith(prefix))) {
      const resourceProviderInstance = resourceProvider.getResourceProvider();
      source = await resourceProviderInstance.getResource(url);
      break;
    }
  }

  // Redefine source for every preProcessor that exists
  for (const preProcessor of preProcessors) {
    if (
      preProcessor.module.sourceExtensionTypes.some(ext => url.endsWith(ext))
    ) {
      const preProcessorInstance = preProcessor.module.getPreProcessor(
        preProcessor.options
      );
      source = (await preProcessorInstance.process(source, url)).source;
      sourceIsWrappedModule =
        sourceIsWrappedModule ||
        isWrappedModule(preProcessor.module.outputExtensionTypes)
          ? true
          : false;
    }
  }

  // Redefine source for every postProcessor that exists
  for (const postProcessor of postProcessors) {
    if (
      postProcessor.module.sourceFormatTypes.includes(format) &&
      !sourceIsWrappedModule
    ) {
      const postProcessorInstance = postProcessor.module.getPostProcessor();
      source = (await postProcessorInstance.process(source)).source;
    }
  }

  return {
    source: source,
  };

  // Defer to Node.js for all other URLs.
  // return defaultGetSource(url, context, defaultGetSource);
}
