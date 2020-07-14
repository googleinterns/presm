import ts from 'typescript';

export let sourceExtensionTypes = ['.ts', '.tsx'];

export let outputExtensionTypes = ['.mjs', '.cjs'];

export function getPreProcessor(configOptions = {}) {
  return {
    process(source, url) {
      // Return new, resolved specifier using ts-specific
      // logic if one exists; undefined otherwise
      function getNewSpecifier(oldSpecifier) {
        let moduleResolutionHost = {
          fileExists: fileName => {
            return ts.sys.fileExists(fileName);
          },
        };
        return ts.resolveModuleName(
          oldSpecifier,
          url.replace('file://', ''),
          configOptions.compilerOptions || {},
          moduleResolutionHost
        ).resolvedModule?.resolvedFileName;
      }

      // Transformer to replace import specifiers with actual path
      // using ts-specific logic
      function tsModuleResolver() {
        return context => {
          function visit(node, inImportExpression) {
            if (inImportExpression && ts.isStringLiteral(node)) {
              let oldSpecifier = node.text;
              let newSpecifier = getNewSpecifier(oldSpecifier);
              if (newSpecifier) {
                return ts.createStringLiteral(newSpecifier);
              }
              return node;
            } else if (ts.isImportDeclaration(node) || ts.isImportCall(node)) {
              return ts.visitEachChild(
                node,
                child => visit(child, true),
                context
              );
            } else {
              return ts.visitEachChild(
                node,
                child => visit(child, false),
                context
              );
            }
          }

          return node => ts.visitNode(node, visit);
        };
      }

      // Add resolver to hook into transpiler logic "before"
      // transpiling occurs - after existing hooks
      configOptions = {
        ...configOptions,
        transformers: {
          ...configOptions.transformers,
          before: (configOptions.transformers?.before
            ? configOptions.transformers.before
            : []
          ).concat([tsModuleResolver()]),
        },
      };

      // Transpile source
      source = ts.transpileModule(source, configOptions).outputText;

      return {
        source: source,
        // Example of choosing a valid extension from possible extensions
        extension: outputExtensionTypes[0],
      };
    },
  };
}
