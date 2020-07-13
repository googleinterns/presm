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

export const ops_list: {[x: string]: (a: number, b: number) => number} = {
  add: add,
  sub: sub,
  mult: mult,
  div: div,
};

export const ops_symbols_list: string[] = ['+', '-', '*', '/'];
