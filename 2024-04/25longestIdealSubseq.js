/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestIdealString = function (s, k) {
  let dp = Array(26).fill(0)
  for (let i = 0; i < s.length; i++) {
    let best = 0, cur = s.charCodeAt(i) - "a".charCodeAt(0)
    for (let prev = 0; prev < 26; prev++) {
      if (Math.abs(prev - cur) <= k) {
        best = Math.max(best, dp[prev])
      }
    }
    dp[cur] = Math.max(dp[cur], best + 1)
    // console.log({s, i, dp})
  }
  return Math.max(...dp)
};


const { bigString } = require("./25bigString")
const tests = [
  { args: ["acfgbd", 2], out: 4 },
  { args: ["abcd", 3], out: 4 },
  { args: ["eduktdb", 15], out: 5 },
  { args: ["ac", 2], out: 2 },
  { args: ["akc", 2], out: 2 },
  { args: [bigString, 8], out: 48822 },
];

tests.forEach((t, i) => {
  let res = longestIdealString(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});