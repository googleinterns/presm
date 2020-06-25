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

## `postProcessors`
