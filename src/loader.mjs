import config from '../loaderconfig.mjs';

// console.log("Config File:");
// console.log(config);

// Load all resourceProviders, preProcessors, and postProcessors as specified in config file

let resourceProviders = await Promise.all(
  config.resourceProviders.map((resourceProvider, i) =>
    import(resourceProvider.type)
  )
);

let preProcessors = await Promise.all(
  config.preProcessors.map((preProcessor, i) => import(preProcessor.name))
);

let postProcessors = await Promise.all(
  config.postProcessors.map((postProcessor, i) => import(postProcessor.name))
);

export let resolve = resourceProviders[0].resolve;

// Dummy getFormat, effectively eliminating this step
export async function getFormat(url, context, defaultGetFormat) {
  return {
    format: 'module',
  };
}

// This getSource hook executes chained resourceProviders, preProcessors, and postProcessors
export async function getSource(url, context, defaultGetSource) {
  const {format} = context;

  let source;

  // Get source using any resouce preovider that accepts this type of URL ("file:")
  for (const resourceProvider of resourceProviders) {
    if (resourceProvider.prefixes.some(prefix => url.startsWith(prefix))) {
      let resourceProviderInstance = resourceProvider.getResourceProvider();
      source = await resourceProviderInstance.getResource(url);
      break;
    }
  }

  // Redefine source for every preProcessor that exists
  for (const preProcessor of preProcessors) {
    if (preProcessor.sourceExtensionTypes.some(ext => url.endsWith(ext))) {
      let preProcessorInstance = preProcessor.getPreProcessor();
      source = (await preProcessorInstance.process(source)).source;
    }
  }

  // Redefine source for every postProcessor that exists
  for (const postProcessor of postProcessors) {
    if (postProcessor.sourceFormatTypes.includes(format)) {
      let postProcessorInstance = postProcessor.getPostProcessor();
      source = (await postProcessorInstance.process(source)).source;
    }
  }

  return {
    source: source,
  };

  // Defer to Node.js for all other URLs.
  // return defaultGetSource(url, context, defaultGetSource);
}
