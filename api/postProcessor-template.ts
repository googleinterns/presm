import thing from 'module';

export let sourceExtensionTypes: string[] = ['.ts', '.tsx'];

export let outputExtensionTypes: string[] = ['.mjs', '.cjs'];

// Example of defining "options" for a TypeScript loader
export interface BabelOptions {
  tsconfigFile?: string;
}

interface ProcessedFile {
  source: string;
  extension?: string;
}

interface postProcessorInstance {
  process: Function;
}

export function getPreprocessor(
  options: BabelOptions = {}
): postProcessorInstance {
  // Create instances and state variables

  // Example of returning a transpiled source using options provided by project config
  return {
    process(source: string): ProcessedFile {
      return {
        source: thing.transpileSource(source, options),
        extension: outputExtensionTypes[0], // Example of choosing
        // a valid extension from possible extensions}
      };
    },
  };
}
