import {moduleWrapper} from '../../src/utils.mjs';

import yaml from 'yaml';

export const sourceExtensionTypes = ['.yaml', '.yml'];

export const outputExtensionTypes = ['.json'];

export function getPreProcessor(options = {}) {
  return {
    async process(source) {
      const yamlSource = yaml.parse(source);
      return {
        source: moduleWrapper(JSON.stringify(yamlSource)),
      };
    },
  };
}
