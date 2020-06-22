# Calc Example

## How It Works

### Start the Destination Path with Loader

1. We run `node --loader=presm ./dist/calc_runner.mjs`.
2. The presm hook loads the project configuration[1].
3. It sees that the path is "owned" by the hook (inside of output prefix).
4. It runs the chain of operations neceesary to generate this resource.
   HOW DOES IT KNOW?
   * Known / stable mapping back and forth, e.g. glob-based or for
     http `dist/_http/<base64-of-url>.*`. That way the mapping back would
     be deterministic.
   * We could even go as far as making *no* glob assumptions at the expense
     of nice destination filenames.
     `dist/_fs/<src-relative-path>.*`.
   * Build index on startup for the files reachable from the resource providers.
   * Require unique basenames to make file-provider enough to get full mapping.
   * Where does the final name come from?
     - fs-loader: src/calc_runner.ts ~> dist/calc_runner.ts
     - ts-pre: dist/calc_runner.ts ~> dist_calc_runner.mjs
   * Output filename generation should be reversible, end-to-end.
     Example: `dist/_fs0/calc.ts.mjs`. This could be obfuscated to
     "look better". May be better or worse.
     `dist/<reversible-string>.<extension>`.
   * Alternatively, we could give up on individual output files
     and configure "bundles". Even worse. Way too slow and complex.
   In this case:
   * File loader from src/calc_runer.ts
     -> { source: ....'0, contentType: 'text/typescript' }
   * typescript preprocessor
     -> { source: ....'1, contentType: 'text/javascript' }
     -> Rewrite specifiers (?)
   * JavaScript postprocessors (babel in this case)
     -> { source: ....'2, contentType: 'text/javascript' }
     -> OR rewrite specifiers here (?)
    #### Tentative Resolution Mapping: Indexing
    * Presm builds up an index of potential transpiled paths to disk paths
    * Therefore `foo.ts.mjs` can be mapped back to `foo.ts` and transpilation can start from that file
    * [See example](#resolution-indexing-example)
5. It passes control to node.js with the final contents.
     -> { format: 'module', source: ....'2 }
6. Node.js sees `import ./calc.mjs` in the generated code.
7. Node calls resolve on `("./calc.mjs", "file://///dist/calc_runner.mjs")`.
8. Loader resolves (somehow?) to `file://///dist/calc.mjs`.
9. Start back at (3).

Q: Should it be `.mjs` or `.js` on the compiled side?
Q: How to deal with valid TS that uses `import ./foo.js`
   to referenece .ts files?

#### Project Configuration

* Where to write generated code.
* Which resources to load and how.
* (pre) Additional source file types to support.
* (post) Which transforms to apply to what kind of resource.

```js
{
  "outputPrefix": "./dist",
  "resourceProviders": [
    { "type": "@presm/file", "base": "./src" },
    "@presm/https",
  ],
  // "Convert one format into another format"
  "preProcessors": [
    "@presm/typescript", // assumption: defaults to tsconfig.json
    "@presm/json",
  ],
  // "Transform within the same format"
  "postProcessors": [
    {
      "type": "@presm/babel",
      "options": {
        "presets": ["env"],
      },
    },
  ],
}
```

* In most cases we have resolved a path before it gets loaded.
* BUT not in all cases..? E.g. dynamic import..?
* Sometimes we didn't rewrite the specifier, that's another case.

```ts
import * as ns from './foo/bar.json';

// This is hard (impossible?) to rewrite.
import('./foo/' + locale + '.json').then(dynNS => {
  dynNS === ns;
});
// If we want to support this, we'll likely have to do the same
// kind of globbing magic that tools like rollup/webpack do.
```

#### Resolution Indexing Example

Example Filesystem:
```stout
/src
  /calc.ts
  /res
    /calc.yaml
```

Example resourceProviders in [Project Config](#project-configuration) 
```js
resourceProviders:
  { "type": "@presm/file", "base": "./src" },
  // This would "own" all files in src/ directory
  // and therefore build an index for all files and subdirectories in this directory
```

Example preProcessors in [Project Config](#project-configuration)
```js
  "preProcessors": [
    "@presm/typescript", // transforms .ts -> [.mjs | .cjs]
    "@presm/yaml", // transforms .yaml -> [.json | .mjs]
  ],
```
Therefore `presm` would build the following many to one mapping of:

transpiled resource &rarr; project file in disk

```
index (including nested directories):
  /dist/src/calc.ts.mjs -> /src/calc.ts
  /dist/src/calc.ts.cjs -> /src/calc.ts
  /dist/src/res/calc.yaml.json -> /src/res/calc.yaml
  /dist/src/res/calc.yaml.mjs -> /src/res/calc.yaml
```
### Start the Source Path with Loader

1. We run `node --loader=presm ./src/calc_runner.ts`.
2. The presm hook loads the [project configuration](#project-configuration)
3. The loader resolves to the equivalent dist path
   (`file://///dist/calc_runner.mjs`).
4. Everything else is as above.

### REPL Usage

```stdout
$ node --loader=presm
> const {calc} = await import('presm-example-calc');
> calc(2, 3);
5
>
```

1. The loader resolves `('presm-example-calc', 'file:///<repl>')`
  * It finds a `package.json` with the right `name`.
  * It finds an exports entry with `./dist/calc.mjs`.
  * It needs to load it on-the-fly.

## Alternatives

* Put source paths into package.json of the project
  (e.g. `"cli": "./src/calc_runner.ts"`)
  and generate a `package.json` in dist that updates the
  paths to their compiled equivalents.
* Potentially this breaks TypeScript (I think it doesn't like
  TypeScript files in `package.json#main`).
* Breaks `npm publish` from project directory.
  This is the same problem that `pika` has.
* Allows to generate "good" `exports` fields.

```js
// ./package.json
{
  "exports": {
    ".": "./src/foo.ts"
  },
}

// ./dist/package.json
{
  "exports": {
    ".": {
      "typings": "./foo.d.ts",
      "require": "./foo.cjs",
      "import": "./foo.mjs",
    },
  },
}
```
