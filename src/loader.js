#!/usr/bin/env node
/* eslint-disable node/shebang */

import {isWrappedModule} from './utils.js';

import {Core} from './core.js';

// These were added as temporary workaround
// without these, both imported preprocessors (TS and YAML)
// cannot seem to find "ts" and "yaml" imports
import ts from 'typescript';
import yaml from 'yaml';

// Create the default instance of coreObj, which contains:
// - config: an object
// - resourceProviders: a promise that resolves to a list
// - preProcessors: a promise that resolves to a list
// - postProcessors: a promise that resolves to a list
// By default this is populated from the default config: "./loaderconfig.json"
const coreObjDefault = new Core();
export async function resolve(...args) {
  return (await coreObjDefault.resourceProviders)[0].resolve(...args);
}

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
export async function getSource(url, context, defaultGetSource, coreObj) {
  if (!coreObj) {
    coreObj = coreObjDefault;
  }
  const {format} = context;

  let source;
  let sourceIsWrappedModule = false;
  // Get source using any resouce preovider that accepts this type of URL ("file:")
  for (const resourceProvider of await coreObj.resourceProviders) {
    if (resourceProvider.prefixes.some(prefix => url.startsWith(prefix))) {
      const resourceProviderInstance = resourceProvider.getResourceProvider();
      source = await resourceProviderInstance.getResource(url);
      break;
    }
  }

  // Redefine source for every preProcessor that exists
  for (const preProcessor of await coreObj.preProcessors) {
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
  for (const postProcessor of await coreObj.postProcessors) {
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
