// is valid using three diff types of brackets ({[]}), ({)} not valid
var isValid = function (s) {
    let stack = [];
    for (let b of s) {
        if ('({['.indexOf(b) !== -1) {
            stack.push(b)
        } else {
            let pair = b === ')' ? '(' : b === '}' ? '{' : '['
            if (stack.pop() !== pair) { return false }
        }
    }
    return stack.length === 0
};

const tests = [
    { s: "()", out: true },
    { s: "()[]{}", out: true },
    { s: "(]", out: false },
    { s: "([)]", out: false },
    { s: "{[]}", out: true }
];

tests.forEach((t, i) => console.log(
    'test', i, isValid(t.s) === t.out
))