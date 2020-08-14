/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/unit/build_functions.js TAP Build System Unit Tests > Bundle object generated correctly 1`] = `
Object {
  "bundle": Object {
    "cache": Object {
      "modules": Array [
        Object {
          "alwaysRemovedCode": Array [],
          "ast": Node {
            "body": Array [
              Node {
                "declarations": Array [
                  Node {
                    "end": 116,
                    "id": Node {
                      "end": 12,
                      "name": "myBear",
                      "start": 6,
                      "type": "Identifier",
                    },
                    "init": Node {
                      "end": 116,
                      "properties": Array [
                        Node {
                          "computed": false,
                          "end": 30,
                          "key": Node {
                            "end": 26,
                            "name": "teeth",
                            "start": 21,
                            "type": "Identifier",
                          },
                          "kind": "init",
                          "method": false,
                          "shorthand": false,
                          "start": 21,
                          "type": "Property",
                          "value": Node {
                            "end": 30,
                            "raw": "10",
                            "start": 28,
                            "type": "Literal",
                            "value": 10,
                          },
                        },
                        Node {
                          "computed": false,
                          "end": 51,
                          "key": Node {
                            "end": 40,
                            "name": "type",
                            "start": 36,
                            "type": "Identifier",
                          },
                          "kind": "init",
                          "method": false,
                          "shorthand": false,
                          "start": 36,
                          "type": "Property",
                          "value": Node {
                            "end": 51,
                            "raw": "'grizzly'",
                            "start": 42,
                            "type": "Literal",
                            "value": "grizzly",
                          },
                        },
                        Node {
                          "computed": false,
                          "end": 113,
                          "key": Node {
                            "end": 65,
                            "name": "children",
                            "start": 57,
                            "type": "Identifier",
                          },
                          "kind": "init",
                          "method": false,
                          "shorthand": false,
                          "start": 57,
                          "type": "Property",
                          "value": Node {
                            "elements": Array [
                              Node {
                                "end": 112,
                                "properties": Array [
                                  Node {
                                    "computed": false,
                                    "end": 79,
                                    "key": Node {
                                      "end": 75,
                                      "name": "teeth",
                                      "start": 70,
                                      "type": "Identifier",
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "start": 70,
                                    "type": "Property",
                                    "value": Node {
                                      "end": 79,
                                      "raw": "11",
                                      "start": 77,
                                      "type": "Literal",
                                      "value": 11,
                                    },
                                  },
                                  Node {
                                    "computed": false,
                                    "end": 96,
                                    "key": Node {
                                      "end": 85,
                                      "name": "type",
                                      "start": 81,
                                      "type": "Identifier",
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "start": 81,
                                    "type": "Property",
                                    "value": Node {
                                      "end": 96,
                                      "raw": "'grizzly'",
                                      "start": 87,
                                      "type": "Literal",
                                      "value": "grizzly",
                                    },
                                  },
                                  Node {
                                    "computed": false,
                                    "end": 110,
                                    "key": Node {
                                      "end": 106,
                                      "name": "children",
                                      "start": 98,
                                      "type": "Identifier",
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "start": 98,
                                    "type": "Property",
                                    "value": Node {
                                      "elements": Array [],
                                      "end": 110,
                                      "start": 108,
                                      "type": "ArrayExpression",
                                    },
                                  },
                                ],
                                "start": 68,
                                "type": "ObjectExpression",
                              },
                            ],
                            "end": 113,
                            "start": 67,
                            "type": "ArrayExpression",
                          },
                        },
                      ],
                      "start": 15,
                      "type": "ObjectExpression",
                    },
                    "start": 6,
                    "type": "VariableDeclarator",
                  },
                ],
                "end": 117,
                "kind": "const",
                "start": 0,
                "type": "VariableDeclaration",
              },
              Node {
                "end": 138,
                "expression": Node {
                  "arguments": Array [
                    Node {
                      "end": 136,
                      "name": "myBear",
                      "start": 130,
                      "type": "Identifier",
                    },
                  ],
                  "callee": Node {
                    "computed": false,
                    "end": 129,
                    "object": Node {
                      "end": 125,
                      "name": "console",
                      "start": 118,
                      "type": "Identifier",
                    },
                    "optional": false,
                    "property": Node {
                      "end": 129,
                      "name": "log",
                      "start": 126,
                      "type": "Identifier",
                    },
                    "start": 118,
                    "type": "MemberExpression",
                  },
                  "end": 137,
                  "optional": false,
                  "start": 118,
                  "type": "CallExpression",
                },
                "start": 118,
                "type": "ExpressionStatement",
              },
            ],
            "end": 139,
            "sourceType": "module",
            "start": 0,
            "type": "Program",
          },
          "code": "const myBear = {\\n    teeth: 10,\\n    type: 'grizzly',\\n    children: [{ teeth: 11, type: 'grizzly', children: [] }],\\n};\\nconsole.log(myBear);\\n",
          "customTransformCache": false,
          "dependencies": Array [],
          "id": "/{fs}/presm/test/fixtures/build-unit/main.ts",
          "moduleSideEffects": true,
          "originalCode": "const myBear = {\\n    teeth: 10,\\n    type: 'grizzly',\\n    children: [{ teeth: 11, type: 'grizzly', children: [] }],\\n};\\nconsole.log(myBear);\\n",
          "originalSourcemap": null,
          "resolvedIds": Null Object {},
          "sourcemapChain": Array [],
          "syntheticNamedExports": false,
          "transformDependencies": Array [],
          "transformFiles": undefined,
        },
      ],
      "plugins": Null Object {
        "pluginPRESM": Null Object {},
      },
    },
    "generate": AsyncFunction generate(rawOutputOptions),
    "watchFiles": Array [
      "/{fs}/presm/test/fixtures/build-unit/main.ts",
    ],
    "write": AsyncFunction write(rawOutputOptions),
  },
  "output": Array [
    Object {
      "code": "const myBear = {\\n    teeth: 10,\\n    type: 'grizzly',\\n    children: [{ teeth: 11, type: 'grizzly', children: [] }],\\n};\\nconsole.log(myBear);\\n",
      "dynamicImports": Array [],
      "exports": Array [],
      "facadeModuleId": "/{fs}/presm/test/fixtures/build-unit/main.ts",
      "fileName": "main.js",
      "implicitlyLoadedBefore": Array [],
      "imports": Array [],
      "isDynamicEntry": false,
      "isEntry": true,
      "isImplicitEntry": false,
      "map": null,
      "modules": Null Object {
        "/{fs}/presm/test/fixtures/build-unit/main.ts": Object {
          "originalLength": 139,
          "removedExports": Array [],
          "renderedExports": Array [],
          "renderedLength": 138,
        },
      },
      "name": "main",
      "referencedFiles": Array [],
      "type": "chunk",
    },
  ],
  "outputOptions": Object {
    "dir": "dist",
    "entryFileNames": Function entryFileNames(entry),
    "format": "esm",
    "plugins": Array [],
    "preserveModules": true,
  },
}
`

exports[`test/unit/build_functions.js TAP Build System Unit Tests > Input options generated correctly 1`] = `
Object {
  "input": Array [
    "/{fs}/presm/test/fixtures/build-unit/main.ts",
  ],
  "plugins": Array [
    Object {
      "load": Function load(id),
      "name": "pluginPRESM",
      "resolveId": Function resolveId(source),
    },
  ],
}
`

exports[`test/unit/build_functions.js TAP Build System Unit Tests > Loader config file read correctly 1`] = `
Core {
  "config": Object {
    "inputDir": "test/fixtures/build-unit",
    "outputDir": "dist",
    "postProcessors": Array [],
    "preProcessors": Array [
      Object {
        "name": "../examples/loaders/preprocessor-typescript.js",
        "options": Object {
          "compilerOptions": Object {
            "module": "esnext",
            "target": "esnext",
          },
        },
      },
    ],
    "resourceProviders": Array [
      Object {
        "base": "./src",
        "type": "../examples/loaders/resourceprovider-basic-fs.js",
      },
    ],
  },
  "postProcessors": Promise {},
  "preProcessors": Promise {},
  "resourceProviders": Promise {},
}
`

exports[`test/unit/build_functions.js TAP Build System Unit Tests > Ouput options (final options) generated correctly 1`] = `
Object {
  "dir": "dist",
  "entryFileNames": Function entryFileNames(entry),
  "format": "esm",
  "plugins": Array [],
  "preserveModules": true,
}
`

exports[`test/unit/build_functions.js TAP Build System Unit Tests > Ouput options (initial options) generated correctly 1`] = `
Object {
  "dir": "dist",
  "entryFileNames": Function entryFileNames(entry),
  "format": "esm",
  "plugins": Array [],
  "preserveModules": true,
}
`

exports[`test/unit/build_functions.js TAP Build System Unit Tests > Output file list generated correctly 1`] = `
Array [
  Array [
    URL {},
    "const myBear = {\\n    teeth: 10,\\n    type: 'grizzly',\\n    children: [{ teeth: 11, type: 'grizzly', children: [] }],\\n};\\nconsole.log(myBear);\\n",
  ],
]
`
