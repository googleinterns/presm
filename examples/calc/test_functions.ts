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
  opSymbol: string,
  a: number,
  b: number,
  res: number | string
): string {
  return `${op} ${a}${opSymbol}${b} = ${res}`;
}
