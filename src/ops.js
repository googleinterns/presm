function add(a,b) {
    return a + b;
}

function sub(a,b) {
    return a - b;
}

function mult(a,b) {
    return a * b;
}

function div(a,b) {
    return a / b;
}

export let ops_list = {"add":add, "sub":sub, "mult":mult, "div":div};

export let ops_symbols_list = ["+", "-", "*", "/"];
