import {moduleWrapper} from '../../src/utils.js';

import yaml from 'yaml';

export const sourceExtensionTypes = ['.yaml', '.yml'];

export const outputExtensionTypes = ['.json'];

export function getPreProcessor(options = {}) {
  return {
    async process(source) {
      const yamlSource = yaml.parse(source, options);
      return {
        source: moduleWrapper(JSON.stringify(yamlSource)),
      };
    },
  };
}
