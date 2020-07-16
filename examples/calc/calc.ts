import {opsList, opsSymbolsList} from './ops';

 
interface ArgvType {
  [x: string]: string[];
}

export function calc(argv: argvType): string {
  let chosenOpString = '';
  let chosenOpSymbol = '';

  if (
    Object.keys(opsList).some((op, i) =>
      op in argv
        ? ((chosenOpString = op),
          (chosenOpSymbol = opsSymbolsList[i]),
          true)
        : false
    )
  ) {
    const equation = argv[chosenOpString].join(chosenOpSymbol);
    const a: number = parseFloat(argv[chosenOpString][0]);
    const b: number = parseFloat(argv[chosenOpString][1]);
    const res = opsList[chosenOpString](a, b);

    return `${chosenOpString} ${equation} = ${res}`;
  } else {
    return 'Invalid calculation';
  }
}
