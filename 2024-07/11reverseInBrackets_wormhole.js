/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function (s) {
  let stack = [], pairs = {}
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i)
    } else if (s[i] === ")") {
      let matchingOpen = stack.pop()
      pairs[matchingOpen] = i
      pairs[i] = matchingOpen
    }
    // console.log({ pairs, i, char: s[i] })
  }
  let direction = 1, cur = 0
  let ans = ""
  while (cur < s.length) {
    let char = s[cur]
    if (char === "(" || char === ")") {
      cur = pairs[cur]
      direction *= -1
    } else {
      ans += char
    }
    cur += direction
    // console.log({ char, cur, ans })
  }
  return ans
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