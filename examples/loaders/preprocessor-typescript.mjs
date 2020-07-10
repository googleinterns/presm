import ts from 'typescript';

export let sourceExtensionTypes = ['.ts', '.tsx'];

export let outputExtensionTypes = ['.mjs', '.cjs'];

export function getPreProcessor(configOptions = {}) {
  return {
    process(source, url) {

      source = ts.transpileModule(source, configOptions).outputText;

      let moduleResolutionHost = {
        fileExists: fileName => {
          return ts.sys.fileExists(fileName);
        },
      };
      let regex = '(?<=("|\'))(w|d|/|.)+(.js|.ts)(?=("|\'))';
      let specifierList = [...source.matchAll(regex)];
      if (specifierList) {
        for (const specifier of specifierList) {
          let oldSpecifier = specifier[0];
          let newSpecifier = ts.resolveModuleName(
            oldSpecifier,
            url.replace('file://', ''),
            configOptions.compilerOptions || {},
            moduleResolutionHost
          ).resolvedModule;

          if (newSpecifier) {
            source = source.replace(
              oldSpecifier,
              newSpecifier.resolvedFileName
            );
          }
        }
      }

      return {
        source: source,
        extension: outputExtensionTypes[0], // Example of choosing
        // a valid extension from possible extensions}
      };
    },
  };
}
