import dotenv from 'dotenv';
dotenv.config();

import {getSourceFromPathSync} from './utils.js';

export class Core {
  constructor(pathToConfig) {
    this.config = this.getConfig(
      pathToConfig || process.env.LOADER_CONFIG || './loaderconfig.json'
    );
    this.loadProcessors();
  }

  getConfig(pathToConfig) {
    return JSON.parse(getSourceFromPathSync(pathToConfig));
  }

  // Load all resourceProviders, preProcessors, and postProcessors as specified in config file
  async loadProcessors() {
    this.resourceProviders = Promise.all(
      this.config.resourceProviders.map((resourceProvider, i) =>
        import(resourceProvider.type)
      )
    );

    this.preProcessors = Promise.all(
      this.config.preProcessors.map(async (preProcessor, i) => {
        return {
          module: await import(preProcessor.name),
          options: preProcessor.options,
        };
      })
    );

    this.postProcessors = Promise.all(
      this.config.postProcessors.map(async (postProcessor, i) => {
        return {
          module: await import(postProcessor.name),
          options: postProcessor.options,
        };
      })
    );
  }
}
