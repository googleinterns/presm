function add(a: number, b: number): number {
  return a + b;
}

function sub(a: number, b: number): number {
  return a - b;
}

function mult(a: number, b: number): number {
  return a * b;
}

function div(a: number, b: number): number {
  return a / b;
}

// Maps a string to a function that takes
// in numbers and returns a number
interface operationsFunctionsList {
  [x: string]: (a: number, b: number) => number;
}

export const opsList: operationsFunctionsList = {
  add: add,
  sub: sub,
  mult: mult,
  div: div,
};

export const opsSymbolsList: string[] = ['+', '-', '*', '/'];
