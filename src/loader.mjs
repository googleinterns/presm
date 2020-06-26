import config from "../loaderconfig.mjs"

// console.log("Config File:");
// console.log(config);

// Load all resourceProviders, preProcessors, and postProcessors as specified in config file

let resourceProviders = await Promise.all(config.resourceProviders.map((resourceProvider, i) => import(resourceProvider.type)));

let preProcessors = await Promise.all(config.preProcessors.map((preProcessor, i) => import(preProcessor.name)));

let postProcessors = await Promise.all(config.postProcessors.map((postProcessor, i) => import(postProcessor.name)));

export let resolve = resourceProviders[0].resolve;

// Dummy getFormat, effectively eliminating this step
export async function getFormat(url, context, defaultGetFormat) {
  return {
    format: 'module'
  };
}

// This getSource hook executes chained resourceProviders, preProcessors, and postProcessors
export async function getSource(url, context, defaultGetSource) {
  const { format } = context;

  let source;

  for (const resourceProvider of resourceProviders) {
    if(resourceProvider.prefixes.some((prefix) => url.startsWith(prefix))){
      let resourceProviderInstance = resourceProvider.getResourceProvider();
      source = await resourceProviderInstance.getResource(url);
      break;
    }
  }

  if (true) {
    // For some or all URLs, do some custom logic for retrieving the source.
    // Always return an object of the form {source: <string|buffer>}.

    for (const postProcessor of postProcessors){
      let postProcessorInstance = postProcessor.getPostProcessor();
      source = (await postProcessorInstance.process(source)).source;
    }

    return {
      source: source
    };
  }
  // Defer to Node.js for all other URLs.
  return defaultGetSource(url, context, defaultGetSource);
}