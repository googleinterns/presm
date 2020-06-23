import thing from 'module';

export let sourceExtensionTypes = [".ts", ".tsx"];

export let outputExtensionTypes = [".mjs", ".cjs"];

export function process(source, options = {}) {
  return {
          source: thing.transpileSource(source)
        }
}
