export default {
  outputPrefix: './dist',
  resourceProviders: [
    {
      type: '../examples/loaders/resourceprovider-dummy-fs.mjs',
      base: './src',
    },
  ],
  preProcessors: [
    {
      name: '../examples/loaders/preprocessor-yaml.mjs',
      options: {},
    },
  ],
  postProcessors: [
    {
      name: '../examples/loaders/postprocessor-consolelog.mjs',
      options: {},
    },
  ],
};
