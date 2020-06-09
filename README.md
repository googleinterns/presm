# `presm`

**This is not an officially supported Google product.**

This is an initial exploration of different use cases for loader hooks in node.

# Calculator Test App

Currently using TypeScript!

NOTE: `npm run check` (aka gts (Google TS) check) currently fails with 3 errors.

## Install Deps

`npm install`

## Usage

### Operations
 - `--add` or `-a`
 - `--sub` or `-s`
 - `--mult` or `-m`
 - `--div` or `-d`

### Examples

`node src/calc_runner.js -a 5 10`

    add 5+10 = 15

`node src/calc_runner.js --div 5 10`

    div 5/10 = 0.5

## Run Unit Tests

Unit tests are run using [Tape](https://github.com/substack/tape)

`node src/tests.js`

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