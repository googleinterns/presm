# API for PRESM

## A living document for the definition and development of the PRESM API

## `resourceProviders`

## `preProcessors`

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
