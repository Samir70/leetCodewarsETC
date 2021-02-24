// 68ms = 98%
const scoreOfParentheses = str => {
    let valids = [];
    let count = 0;
    let cur = ''
    for (let c of str) {
        count += c === '(' ? 1 : -1
        cur += c;
        if (count === 0) {
            valids.push(cur);
            cur = ''
        }
    }
    // console.log(valids);
    let score = 0;
    while (valids.length) {
        let cur = valids.pop();
        let inner = cur.slice(1, cur.length - 1);
        score += inner.length === 0 ? 1 : 2*scoreOfParentheses(inner)
    }
    return score
}

const tests = [
    "()", "(())", "()()", "(()(()))"
]

const outs = [
    1, 2, 2, 6
];

tests.forEach((t, i) => console.log(
    'test', i, scoreOfParentheses(t) === outs[i]
))
