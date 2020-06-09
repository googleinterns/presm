# `presm`

**This is not an officially supported Google product.**

This is an initial exploration of different use cases for loader hooks in node.

# Calculator Test App

Currently using TypeScript!

NOTE: Now able to run using loader hooks for TypeScript transpiling!

## Install Deps

`npm install`

## Usage

### Operations
 - `--add` or `-a`
 - `--sub` or `-s`
 - `--mult` or `-m`
 - `--div` or `-d`

### Compiling - Now **Deprecated**, use loader hooks below

`npm run compile`

### Examples: Running Using Loader Hook

`node --experimental-loader  @k-foss/ts-esnode  --experimental-specifier-resolution=node ./src/calc_runner.ts -a 5 10`

    add 5+10 = 15

`node --experimental-loader  @k-foss/ts-esnode  --experimental-specifier-resolution=node ./src/calc_runner.ts --div 5 10`

    div 5/10 = 0.5

## Run Unit Tests

Unit tests are run using [Tape](https://github.com/substack/tape)

`node --experimental-loader  @k-foss/ts-esnode  --experimental-specifier-resolution=node ./src/tests.ts`

    TAP version 13
    # add test
    ok 1 should be strictly equal
    ok 2 should be strictly equal
    # sub test
    ok 3 should be strictly equal
    ok 4 should be strictly equal
    # mult test
    ok 5 should be strictly equal
    ok 6 should be strictly equal
    # div test
    ok 7 should be strictly equal
    ok 8 should be strictly equal

    1..8
    # tests 8
    # pass  8

    # ok