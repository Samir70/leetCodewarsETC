const longestValidParentheses = s => {
    let stack = [-1], max = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop()
            if (stack.length === 0) {stack.push(i)}
            max = Math.max(max, i - stack[stack.length - 1])
        }
    }
    return max
};

const tests = [
    { s: "()", out: 2 },
    { s: "(()", out: 2 },
    { s: "()(()", out: 2 },
    { s: "(()()", out: 4 },
    { s: "(())()", out: 6 },
    { s: ")))()", out: 2 },
    { s: ")()())", out: 4 },
    { s: "())(()", out: 2 }
]

tests.forEach((t, i) => console.log(
    'test', i, longestValidParentheses(t.s) === t.out
))