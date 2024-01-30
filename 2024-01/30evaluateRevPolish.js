var evalRPN = function (tokens) {
  if (tokens.length === 1) { return Number(tokens[0]) }
  let stack = [];
  let out = null;
  for (let t of tokens) {
    if ('+-*/'.indexOf(t) !== -1) {
      let b = stack.pop(), a = stack.pop()
      switch (t) {
        case '+': { out = a + b; break }
        case '-': { out = a - b; break }
        case '*': { out = a * b; break }
        case '/': { out = Math.trunc(a / b); break }
        default: { console.log('oops!') }
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
  { args: [["2", "1", "+", "3", "*"]], out: 9 },
  { args: [["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], out: 22 },
  { args: [["4", "13", "5", "/", "+"]], out: 6 },
  { args: [["18"]], out: 18 },
  { args: [["4", "-2", "/", "2", "-3", "-", "-"]], out: -7 },
  { args: [["3", "11", "+", "5", "-"]], out: 9 }
];

tests.forEach((t, i) => {
  let res = evalRPN(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});