// given inputs are strings, but could be anything in this implementation
// 104ms beats 76%
// only really need the prev row of dp, so can save on memory
var longestCommonSubsequence = function (A, B) {
  let dp = Array(A.length + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = Array(B.length + 1).fill(0)
  }

  for (let r = 1; r < dp.length; r++) {
    for (let c = 1; c < dp[0].length; c++) {
      if (A[r - 1] === B[c - 1]) {
        dp[r][c] = dp[r - 1][c - 1] + 1
      } else {
        dp[r][c] = Math.max(dp[r][c - 1], dp[r - 1][c])
      }
    }
  }
  return dp[A.length][B.length]
};

const tests = [
  { args: ["bl", "yby"], out: 1 },
  { args: ["abc", "abc"], out: 3 },
  { args: ["abc", "def"], out: 0 },
  { args: ["abcde", "ace"], out: 3 }
];

tests.forEach((t, i) => {
  let res = longestCommonSubsequence(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});