/**
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function (s) {
  const memo = {}
  const helper = (left, right) => {
    if (left === right) {return 0}
    let key = [left, right].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let ans = s.length
    let j = -1;
    for (let i = left; i < right; i++) {
      if (j === -1 && s[i] !== s[right]) { j = i }
      if (j !== -1) {
        ans = Math.min(ans, 1 + helper(j, i) + helper(i + 1, right))
      }
    }
    if (j === -1) { ans = 0 }
    memo[key] = ans
    return ans
  }
  return helper(0, s.length - 1) + 1
};

const tests = [
  { args: ["aaabbb"], out: 2 },
  { args: ["aba"], out: 2 },
  { args: ["aaaabbbbbbaacccaabbbb"], out: 4 },
  { args: ["hhhhhskdfjhsdaghghggggdsfhgsadjhgfku"], out: 21 },
];

tests.forEach((t, i) => {
  let res = strangePrinter(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});