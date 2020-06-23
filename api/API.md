# API for PRESM

## A living document for the definition and development of the PRESM API

## `resourceProviders`

## `preProcessors`

### Main role: convert from one format to another format
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
  - NOTE: I believe `source` should be of type (`Buffer` | `string`) but am not certain
  - [Example `preProcessor` template](https://github.com/googleinterns/presm/blob/api-preProcessors/api/preProcessor-template.js)

- Return converted source file(s) either:
  - In the form of a `string` or `buffer` that `node` will be able to run
  - As a saved file complete with a valid extension of `outputExtensionTypes`

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
