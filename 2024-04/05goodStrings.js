/**
 * @param {string} s
 * @return {string}
 * removes pairs such as eE or Aa
 */
var makeGood = function (s) {
  // console.log("a".charCodeAt(0) - "A".charCodeAt(0)); // 32
  let stack = []
  for (let c of s) {
    if (stack.length === 0) {
      stack.push(c)
    } else {
      let last = stack[stack.length - 1]
      if (Math.abs(c.charCodeAt(0) - last.charCodeAt(0)) === 32) {
        stack.pop()
      } else {
        stack.push(c)
      }
    }
  }
  return stack.join("")
};

const tests = [
  { args: ["leEeetcode"], out: "leetcode" },
  { args: ["leEeeTtECOocde"], out: "lede" },
  { args: ["abBAcC"], out: "" },
  { args: ["s"], out: "s" },
];

tests.forEach((t, i) => {
  let res = makeGood(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});