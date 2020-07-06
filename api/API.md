# API for PRESM

## A living document for the definition and development of the PRESM API

## `resourceProviders`

### Requirements of writing a resourceProvider itself:
- Expose which kinds of resource paths it can handle
  - e.g. the file loader can handle file:/// prefixes
  - e.g. the https can handle https:// prefixes and potentially http:// prefixes - depending on config
  - NOTE: a zip loader might have to handle a certain suffix as well
    - .zip, .gz, etc.
    - Chained resource provider: case where .zip is coming from https
- Return source of resource (https case) or direct local location where other loaders can use/find it (file case, potentially .zip case)
  - Likely returned as a `string`
  - NOTE: this is where we could explore returning data objects instead of a `string`
    - E.g. https loader get-ing a JSON file from the network should not have to serialize it into a `string` only to have another loader parse the JSON object again - will continue to think through this aspect

### Requirements of including and configuring a resourceProvider - in project config:
- Specify loader
- Specify a list of base directories that presm will operate on with this loader
  - Could default to package.json's exports list
  - Example:
  ```js
  "resourceProviders": [
    { "name": "@presm/file", "bases": ["./src"] },
    { "name": "@presm/https", "bases":[ ] }
  ],
  ```

## `preProcessors`

Main role: convert from one format to another format.

### Requirements of writing a preProcessor itself:
- Expose sourceExtensionTypes (from) and outputExtensionTypes (to) extension types for file types it can handle and output
  - Both sourceExtensionTypes and outputExtensionTypes are likely arrays
    - E.g. a TypeScript preProcessor might convert from [.ts , .tsx] to [.mjs, .cjs]
  - NOTE: TBD a uniform formal way to expose these
- Create an appropriate interface to configure this preProcessor's behavior in project config
  - See example below ↓ ↓
- NOTE: Could also define defaults options
  - For a TypeScript preProcessor, a default might be to use the project's existing tsconfig.json

- Expect `source` as a param coming from a valid `resourceProvider` OR *IMPORTANT* from another chained `prePrecessor`
  - NOTE: I believe `source` should be of type `string`
    - [Reasoning for this](https://github.com/googleinterns/presm/pull/3#pullrequestreview-436898909)
  - [Example `preProcessor` template](https://github.com/googleinterns/presm/blob/api-preProcessors/api/preProcessor-template.js)

- Return converted source file(s) either:
  - In the form of a `string` that `node` will be able to run
  - As a saved file complete with a valid extension of `outputExtensionTypes`
  - NOTE: Until Node.js `getFormat` hook is updated as discussed in [this PR](https://github.com/nodejs/node/pull/34144), all `preProcessors` are expected to return a module with a default export for all formats
    - E.g. a YAML loader must return its converted `JSON` object as the default export in an module
    - See current `examples/loaders/preprocessor-yaml.mjs` loader in for a working example

- Behavior Note: I do not believe a preProcessor should be filtering files based on these extensions, I believe that to be the responsibility of the caller for this loader

### Requirements of including and configuring a preProcessor - in project config:
- Specify loader name
- Specify options (optional)
  - NOTE: this interface should be defined by the preProcessor but all configuration options should go under options
  - Example:
  ```js
  "preProcessors": [
    {
      "name": "@presm/typescript",
      "options": {
        "tsconfigFile": "./tsconfig.json",
      },
    },
    {
      "name": "@presm/json",
    },
  ],
  ```

## `postProcessors`

Main role: transform from one format to the _same_ format

#### This turned out to be similar to `preProcessors` but important to define by itself anyway

### Requirements of writing a postProcessor itself:
- Expose `sourceExtensionTypes` (from) and `outputExtensionTypes` (to) extension types for file types it can handle and output
  - NOTE: although this type of processor should convert within the same format, it could change extension (E.g. `.js` &rarr; `.mjs`).  Therefore, for consistency I do believe it should define these for now
- Create an appropriate interface to configure this `postProcessor`'s behavior in project config
  - See example below ↓ ↓
- NOTE: Could also define defaults options
  - For a Babel `postProcessor`, a default might be to use the project's existing `.babelrc`
- Expect `source` as a param coming from a valid `resourceProvider` OR *IMPORTANT* from another chained `prePrecessor` OR from another chained `postProcessor`
  - NOTE: I believe `source` should be of type `string`
    - [Reasoning for this](https://github.com/googleinterns/presm/pull/3#pullrequestreview-436898909)
  - [Example `postProcessor` template](https://github.com/googleinterns/presm/blob/api-preProcessors/api/preProcessor-template.js)

- Return converted source file(s) either:
  - In the form of a `string` that `node` will be able to run
  - As a saved file complete with a valid extension of `outputExtensionTypes`

- Behavior Note: I do not believe a `postProcessor` itself should be filtering files based on these extensions, I believe that to be the responsibility of the caller for this loader

### Requirements of including and configuring a `postProcessor` - in project config:
- Specify loader name
- Specify options (optional)
  - NOTE: I believe the interface for these options should be defined within the loader itself but the customizable part of these options should be here
  - Example:
  ```js
  "postProcessors": [
    {
      "type": "@presm/babel",
      "options": {
        "presets": ["env"],
      },
    },
  ],
  ```
