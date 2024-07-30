/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function (s) {
  const dp = Array(s.length + 1).fill(0)
  let bCount = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "b") {
      dp[i+1] = dp[i]
      bCount++
    } else {
      dp[i+1] = Math.min(dp[i] + 1, bCount)
    }
  }
  return dp[s.length]
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