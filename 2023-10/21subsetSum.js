/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// too much memory / too slow
// var constrainedSubsetSum = function (nums, k) {
//   // best finish from i, having just skipped some
//   let memo = {}, maxAns = 0;
//   const dp = (i, skipped) => {
//     if (skipped >= k || i >= nums.length) { return 0 }
//     let key = [i, skipped].join(",");
//     if (memo[key] !== undefined) { return memo[key] }
//     let keepThisElement = nums[i] + dp(i + 1, 0)
//     let skipThisElement = dp(i + 1, skipped + 1)
//     memo[key] = Math.max(keepThisElement, skipThisElement)
//     maxAns = Math.max(maxAns, memo[key])
//     return memo[key]
//   }
//   dp(0, 0)
//   // console.log(memo)
//   return maxAns === 0 ? Math.max(...nums) : maxAns
// };
// TLE when k = 58823
var constrainedSubsetSum = function (nums, k) {
  let prev = Array(k).fill(0);
  prev[0] = nums[nums.length - 1];
  let maxSum = 0;
  for (let i = nums.length - 2; i >= 0; i--) {
    let cur = Array(k).fill(0);
    for (let j = k - 1; j >= 0; j--) {
      if (j === 0) {
        let bestOfPrev = Math.max(...prev)
        cur[j] = Math.max(nums[i], nums[i] + bestOfPrev)
      } else {
        cur[j] = prev[j - 1]
      }
    }
    maxSum = Math.max(maxSum, ...cur)
    prev = [...cur]
    // console.log("done ", { i, val: nums[i], row: dp[i] })
  }
  // console.log(dp)
  return maxSum <= 0 ? Math.max(...nums) : maxSum
};


const { bigTest, bigTest2, bigTest3 } = require('./21bigtest')
const tests = [
  { args: [[10, 2, -10, 5, 20], 2], out: 37 },
  { args: [[-1, -2, -3], 1], out: -1 },
  { args: [[-1, -2, -3, 4, -5, -6, -7], 1], out: 4 },
  { args: [[10, -2, -10, -5, 20], 2], out: 23 },
  { args: [[4, -2, -3, 3, -5, 2, -7, 1, -8, -9, 7], 2], out: 8 },
  { args: [[4, -2, -3, 3, -5, 2, -7, 1, -8, -9, 10], 2], out: 10 },
  { args: [[4, -2, -3, 3, -5, 2, -7, 1, -8, -9, 11], 2], out: 11 },
  { args: [[4, -2, -3, 3, -5, 7, -7, 1, -8, -9, 10], 2], out: 15 },
  { args: [[-8269, 3217, -4023, -4138, -683, 6455, -3621, 9242, 4015, -3790], 1], out: 16091 },
  { args: [bigTest, 1050], out: 12245752 },
  { args: [bigTest2, 2460], out: 24359456 },
  { args: [bigTest3, 58823], out: 250377944 },
];

tests.forEach((t, i) => {
  // if (i !== 8) { return }
  let res = constrainedSubsetSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});