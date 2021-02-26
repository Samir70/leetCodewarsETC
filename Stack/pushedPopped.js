const validateStackSequences = (pushed, popped) => {
    let stack = [];
    let i = 0;
    pushed.reverse();
    while (i < popped.length && pushed.length) {
        let cur = pushed.pop()
        while (cur === popped[i] && i < popped.length) {
            i++;
            cur = stack.pop()
        }
        stack.push(cur)
    }
    return pushed.length === 0 && i === popped.length
}

const tests = [
    { pushed: [1, 2, 3, 4, 5], popped: [4, 5, 3, 2, 1], out: true },
    { pushed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], popped: [1, 0, 2, 3, 4, 7, 6, 5, 9, 8], out: true },
    { pushed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], popped: [1, 0, 3, 5, 7, 6, 4, 9, 8, 2], out: true }
]

tests.forEach((t, i) => console.log(
    'test', i, validateStackSequences(t.pushed, t.popped) === t.out
))

const makeTest = n => {
    let pushed = [], popped = [], stack = [];
    let i = 0;
    while (i < n) {
        let shouldPush = Math.random() < 0.5 ? true : false;
        if (shouldPush) {
            pushed.push(i);
            stack.push(i);
            i++;
        } else if (stack.length) {
            popped.push(stack.pop())
        }
    }
    while (stack.length) { popped.push(stack.pop()) }
    return { pushed, popped, out: true }
}

// console.log(makeTest(100))