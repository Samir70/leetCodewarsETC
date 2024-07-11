/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function (s) {
  let ans = ""
  let stack = []
  for (let c of s) {
    if (c === ")") {
      let mid = ""
      while (stack[stack.length - 1] !== "(") {
        mid += stack.pop()
        // console.log({ stack, ans })
      }
      stack.pop()
      for (let m of mid) {
        stack.push(m)
      }
      // console.log("final stack:", stack)
    } else {
      stack.push(c)
    }
  }
  return stack.join("")
};

const tests = [
  { args: ["(abcd)"], out: "dcba" },
  { args: ["(u(love)i)"], out: "iloveu" },
  { args: ["(ed(et(oc))el)"], out: "leetcode" },
  { args: ["hello"], out: "hello" },
  { args: ["h(olle)"], out: "hello" },
];

tests.forEach((t, i) => {
  let res = reverseParentheses(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});