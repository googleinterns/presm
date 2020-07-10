import ts from 'typescript';
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
      name: '../examples/loaders/preprocessor-typescript.mjs',
      options: {
        compilerOptions: {
          noEmitOnError: true,
          noImplicitAny: true,
          target: ts.ScriptTarget.ES5,
          module: ts.ModuleKind.ESNext,
        },
      },
    },
  ],
  postProcessors: [
    {
      name: '../examples/loaders/postprocessor-consolelog.mjs',
      options: {},
    },
  ],
};
