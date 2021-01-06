// takes too long
var numDecodingsTLE = function (s) {
    let stack = [s];
    let out = 0
    while (stack.length) {
        let cur = stack.pop()
        if (cur.length === 0) { out++; continue }
        if (cur[0] !== '0') {
            stack.push(cur.slice(1))
            if (Number(cur[0] + cur[1]) <= 26) { stack.push(cur.slice(2)) }
        }
    }
    return out
};


let memo = {}
const numDecodings = s => {
    if (s.length === 0 || s[0] === '0') { return 0 }
    if (s.length === 1) { return 1 }
    if (s.length === 2 && Number(s) <= 26) { return s[1] === '0' ? 1 : 2 }
    if (memo[s] === undefined) {
        memo[s] = numDecodings(s.slice(1));
        let twoDigit = Number(s[0] + s[1]);
        if (twoDigit <= 26) { memo[s] += numDecodings(s.slice(2)) }
    }
    return memo[s]
}

const tests = [
    { str: "0", out: 0 },
    { str: "12", out: 2 },
    { str: "10", out: 1 },
    { str: "226", out: 3 },
    { str: "2839", out: 1 },
    { str: "111111111111111111111111111111111111111111111", out: 1836311903 },
    { str: "26777821324109", out: 12 }
]

tests.forEach((t, i) => console.log(
    'test', i, ':', t, 'ways to decode', numDecodings(t.str), 'should be', t.out
))
// console.log(memo)