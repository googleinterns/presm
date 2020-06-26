import yaml from 'yaml';

export const sourceExtensionTypes = ['.yaml'];

export const outputExtensionTypes = ['.json'];

export function getPreProcessor(options = {}) {
  return {
    async process(source) {
      const yamlSource = yaml.parse(source);
      return {
        source: JSON.stringify(yamlSource),
      };
    },
  };
}
