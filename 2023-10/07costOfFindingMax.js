/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
let base = 10**9 + 7;
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
    if (b % 2) { out = (out + a) % base }
    a = (a + a) % base;
    b = b >> 1
  }
  return out
}
var numOfArrays = function (n, m, k) {
  const memo = {}
  const dp = (i, maxSoFar, remaining) => {
    if (remaining < 0) { return 0 }
    if (i === n) { return remaining === 0 ? 1 : 0 }
    let key = [i, maxSoFar, remaining].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let ans = maxSoFar === 0 ? 0 : multMod(maxSoFar, dp(i + 1, maxSoFar, remaining))
    for (let newMax = maxSoFar + 1; newMax <= m; newMax++) {
      ans = (ans + dp(i + 1, newMax, remaining - 1)) % base
    }
    memo[key] = ans
    return ans
  }

  return dp(0, 0, k)
};

const tests = [
  { args: [2, 1, 1], out: 1 },
  { args: [2, 2, 1], out: 3 },
  { args: [2, 3, 1], out: 6 },
  { args: [5, 2, 3], out: 0 },
  { args: [9, 1, 1], out: 1 },
  { args: [3, 3, 2], out: 12 },
  { args: [4, 3, 2], out: 39 },
  { args: [3, 78, 2], out: 237237 },
  { args: [37, 17, 1], out: 616363148 },
  { args: [37, 17, 7], out: 418930126 },
  { args: [50, 100, 25], out: 34549172 },
];

tests.forEach((t, i) => {
  // if (i > 2) { return }
  let res = numOfArrays(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});