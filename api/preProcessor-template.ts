import thing from 'module';

export let sourceExtensionTypes: string[] = [".ts", ".tsx"];

export let outputExtensionTypes: string[] = [".mjs", ".cjs"];


// Example of defining "options" for a TypeScript loader
export interface TypeScriptOptions {
  tsconfigFile?: string
}

export function process(source: string, options: TypeScriptOptions = {}): string {

  // Example of returning a transpiled source using options provided by project config
  return {
          source: thing.transpileSource(source, options)
        }
}
