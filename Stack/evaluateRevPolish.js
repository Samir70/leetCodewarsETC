var evalRPN = function(tokens) {
    if (tokens.length === 1) {return Number(tokens[0])}
    let stack = [];
    let out = null;
    for (let t of tokens) {
        if ('+-*/'.indexOf(t) !== -1) {
            let b = stack.pop(), a = stack.pop()
            switch (t) {
                case '+' : {out = a + b; break}
                case '-' : {out = a - b; break}
                case '*' : {out = a * b; break}
                case '/' : {out = Math.trunc(a/b); break}
                    default : {console.log('oops!')}
            }
            stack.push(out)
        } else {
            stack.push(Number(t));
        }
        // console.log(stack, t, out, '+-*/'.indexOf(t))
    }
    return out
};

const tests = [
    { tokens: ["2", "1", "+", "3", "*"], out: 9 },
    { tokens: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"], out: 22 },
    { tokens: ["4", "13", "5", "/", "+"], out: 6 },
    { tokens: ["18"], out: 18 },
    { tokens: ["4", "-2", "/", "2", "-3", "-", "-"], out: -7 },
    { tokens: ["3", "11", "+", "5", "-"], out: 9 }
]