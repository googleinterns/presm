function *parseExpression(expr: string) {
  const tokenPattern = /\s*(?:(?<op>[+-/*])|(?<num>\d+)|(?<open>[(])|(?<close>[)]))\s*/g;
  let m;
  while ((m = tokenPattern.exec(expr)) !== null) {
    const {op, num, open, close} = m.groups || {};
    if (op) {
      yield {type: 'op', op};
    } else if (open) {
      yield {type: 'open'};
    } else if (close) {
      yield {type: 'close'};
    } else {
      yield {type: 'num', num: parseFloat(num) };
    }
  }
}

export function evalExpression(expr: string) {
  const tokens = [...parseExpression(expr)];
  let idx = 0;

  function peekOp() {
    if (idx < tokens.length && tokens[idx].type === 'op') {
      return tokens[idx].op;
    }
    return null;
  }

  function evalNum(): number {
    if (idx < tokens.length && tokens[idx].type === 'num') {
      return tokens[idx++].num!;
    }
    throw new SyntaxError('Expected number');
  }

  // "(" addSub ")" | num
  function evalParen(): number {
    if (tokens[idx].type === 'open') {
      ++idx;
      const result = evalAddSub();
      if (tokens[idx].type !== 'close') {
        throw new SyntaxError('Missing closing parenthesis');
      }
      ++idx;
      return result;
    }
    return evalNum();
  }

  // paren ( ("*"|"/") parent )*
  function evalMultiDiv(): number {
    let result = evalParen();
    while (idx < tokens.length) {
      const op = peekOp();
      if (op === '*' || op === '/') {
        ++idx;
        const other = evalParen();
        if (op === '*') {
          result *= other;
        } else {
          result /= other;
        }
      } else {
        break;
      }
    }
    return result;
  }

  // multiDiv ( ("+"|"-") multiDiv )*
  function evalAddSub(): number {
    let result = evalMultiDiv();
    while (idx < tokens.length) {
      const op = peekOp();
      if (op === '+' || op === '-') {
        ++idx;
        const other = evalMultiDiv();
        result += op === '-' ? -other : other;
      } else {
        break;
      }
    }
    return result;
  }

  const finalResult = evalAddSub();
  if (idx < tokens.length) {
    throw new SyntaxError('Unexpected end of input');
  }
  return `${expr} = ${finalResult}`;
}
