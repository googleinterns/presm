import thing from 'module';

export let sourceExtensionTypes: string[] = [".ts", ".tsx"];

export let outputExtensionTypes: string[] = [".mjs", ".cjs"];


// Example of defining "options" for a TypeScript loader
export interface TypeScriptOptions {
  tsconfigFile?: string
}

export function process(source: string | Buffer, options: TypeScriptOptions = {}): string| Buffer {
  return {
          source: thing.transpileSource(source)
        }
}
