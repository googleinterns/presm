import { ops_list, ops_symbols_list, argvType } from './ops.ts';

export function calc(argv: argvType): string {
  let chosen_op_string = '';
  let chosen_op_symbol = '';

  if (
    Object.keys(ops_list).some((op, i) =>
      op in argv
        ? ((chosen_op_string = op),
          (chosen_op_symbol = ops_symbols_list[i]),
          true)
        : false
    )
  ) {
    const equation = argv[chosen_op_string].join(chosen_op_symbol);
    const a: number = parseFloat(argv[chosen_op_string][0]);
    const b: number = parseFloat(argv[chosen_op_string][1]);
    const res = ops_list[chosen_op_string](a, b);

    return `${chosen_op_string} ${equation} = ${res}`;
  } else {
    return 'Invalid calculation';
  }
}
