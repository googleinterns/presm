export function modifyTestArgv(argv: any, op: string, a: number, b: number) {
  delete argv.add;
  delete argv.sub;
  delete argv.div;
  delete argv.mult;
  argv[op] = [a, b];
  return argv;
}

export function createCorrectOutput(
  op: string,
  op_symbol: string,
  a: number,
  b: number,
  res: number | string
): string {
  return `${op} ${a}${op_symbol}${b} = ${res}`;
}
