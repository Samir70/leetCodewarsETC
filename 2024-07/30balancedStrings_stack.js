/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function (s) {
  let dels = 0
  let stack = []
  for (let c of s) {
    if (c === "a" && stack[stack.length - 1] === "b") {
      stack.pop()
      dels++
    } else {
      stack.push(c)
    }
  }
  return dels
};

const tests = [
  { args: ["aababbab"], out: 2 },
  { args: ["bbaaaaabb"], out: 2 },
  { args: ["aaaaabaaabbbabbbbbb"], out: 2 },
  { args: ["bbaaaaaaabbbaabababababaaaaaaaaaaaabbbaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbabbaabb"], out: 16 },
];

tests.forEach((t, i) => {
  let res = minimumDeletions(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});