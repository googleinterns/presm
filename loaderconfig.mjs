export default {
  outputPrefix: './dist',
  resourceProviders: [
    {
      type: '../examples/playground/dummy-fs.mjs',
      base: './src',
    },
  ],
  preProcessors: [],
  postProcessors: [
    {
      name: '../examples/playground/consolelog.mjs',
      options: {},
    },
  ],
};
