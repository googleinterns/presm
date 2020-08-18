# `presm`

**This is not an officially supported Google product.**

## Overview

Presm is a tool that allows developers to easily create, use, and organize loaders to use in their ES Module projects with `Node`.

Example use-case:
You're working in `typescript` and want a quick way to transpile and run this code.  Having a `typescript` loader configured, you can use this:
```js
node --loader=presm foo.ts
```
Then you'd like to run this code without relying on these loaders for transpilation before execution:
```js
presmbuilder --output dist
```
Now you can run this using just `Node`:
```js
node dist/foo.js
```

## Usage Guide

### Usage Modes

PRESM has two usage modes, `[on-the-fly]` and `[build]`, they can be executed after sucessfully [installing](#Intstallation) PRESM in a project. 

### `[on-the-fly]` mode

In `[on-the-fly]` mode PRESM does not write to disk, it simply applies all the loaders specified in your `loaderconfig.json` and executes the resulting code.  

In this mode, PRESM exists as a loader that you use `Node` to call:

```js
node --loader=presm foo.ts
```

### `[build]` mode

In `[build]` mode PRESM first applies to loaders specified in your `loaderconfig.json`, then writes the output files to the folder specified in `outputDir` in the `loaderconfig.json`. After this mode executes, you should be able to execute these files using just `Node`.

In this mode, PRESM exists as a CLI tool, `presmbuilder`; it has the following options:
```shell
Options:
  --help        Show help                         [boolean]
  --version     Show version number               [boolean]
  -f, --file    File to build                      [string]
  -o, --output  Directory to output; 
                overwrites loaderconfig            [string]
```
#### `--file`
This is used to target one specific file to build, instead of an entire directory.  *NOTE*:  when building one file with this option, PRESM will only apply specified loaders to this file, not its dependencie tree - therefore, all imports of that file must be bare specifiers.

*Will not* work:
```js
single_file.ts:

import myModule from './mymodule.mjs';
import myTSModule from './mymodule.ts';

myModule.doSomething();
```
*Will* work:
```js
single_file.ts:

import ts from 'typescript';
ts.doSomething();
```

#### `--output`
This is used to override the output folder (`outputDir` in `loaderconfig.json`) that will contain the built files.  *NOTE*: this folder name cannot begin with `.` nor `/`

### `loaderconfig.json`

This file should exist in your projects root directory.  Below is a sample of the files format:
```json
{
    "inputDir": "src",
    "outputDir": "dist",
    "resourceProviders": [
      {
        "type": "../examples/loaders/resourceprovider-basic-fs.js"
      }
    ],
    "preProcessors": [
      {
        "name": "../examples/loaders/preprocessor-yaml.js",
        "options": {}
      },
      {
        "name": "../examples/loaders/preprocessor-typescript.js",
        "options": {
          "compilerOptions": {
            "target": "esnext",
            "module": "esnext"
          }
        }
      }
    ],
    "postProcessors": []
  }
```
- `resourceProviders`, `preProcessors`, and `postProcessors` are all list of loader objects
- `resourceProvider` objects need a `type`
- `pre-` and `post-` `processors` object need a `name` and can have `options` passed into the those loaders
- All `type` and `name` files are file locations relative to the `presm` project root directory
- If no `loaderconfig.json` exists in your proejcts root directory, `presm` will default to the `loaderconfig.json` in its `presm`'s directory

## Intstallation Guide

As of yet, `presm` must be cloned locally for use:

- Clone [the repo](https://github.com/googleinterns/presm/)
- Install dependencies: `npm install`
- Link CLI commands: `npm link`

Then, in the main directory of a project you would like to use `presm` with, you must symlink `presm`'s CLI commands:
`npm link presm`

## Loader Creation

Anyone can create their own loader.  It should be put in your local `presm/examples/loaders/` folder and referenced correctly in `loaderconfig.json`.  All loaders should:
- export `sourceExtensionTypes` : `[string]`
  - Types of files this loader should be applied on
  - E.g. [`.ts`]
- export `outputExtensionTypes` : `[string]`
  - Types of files this loader should output
  - E.g. [`.js`, `.mjs`]
- export `getPreProcessor`: `func`
  - This should return a object with `process` property - which should be a function that recieves a `source` and a `url` and outputs a `source`
- For more examples on loader creation see `examples/loaders/`