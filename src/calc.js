import { ops_list, ops_symbols_list } from "./ops.js"

export function calc(argv){

  let chosen_op_string;
  let chosen_op_symbol;

  if (Object.keys(ops_list).some((op, i) => op in argv ? (chosen_op_string = op, chosen_op_symbol = ops_symbols_list[i] ,true) : false)) {

    let equation = argv[chosen_op_string].join(chosen_op_symbol);
    let res = ops_list[chosen_op_string](argv[chosen_op_string][0], argv[chosen_op_string][1]);

    return `${chosen_op_string} ${equation} = ${res}`
  }
  else{
    return "Invalid calculation"
  }
}
