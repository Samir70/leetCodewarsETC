// given inputs are strings, but could be anything in this implementation
// 104ms beats 76%
// only really need the prev row of dp, so can save on memory
var longestCommonSubsequence = function(A, B) {
    let dp = Array(A.length + 1);
    for (let i = 0; i<dp.length; i++ ) {
        dp[i] = Array(B.length + 1).fill(0)
    }
    
    for (let r = 1; r < dp.length; r++) {
        for (let c = 1; c < dp[0].length; c++) {
            if (A[r-1] === B[c-1]) {
                dp[r][c] = dp[r-1][c-1] + 1
            } else {
                dp[r][c] = Math.max(dp[r][c-1], dp[r-1][c])
            }
        }
    }
    return dp[A.length][B.length]
};

const tests = [
  {tA: "bl", tB: "yby", out:1},
  {tA: "abc", tB: "abc", out:3},
  {tA: "abc", tB: "def", out:0}
];

tests.forEach((t, i) => console.log(
  'test', i, longestCommonSubsequence(t.tA, t.tB) === t.out
))
