/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var constrainedSubsetSum = function (nums, k) {
  let queue = [], qPointer = -1;
  let dp = Array(nums.length);
  let maxSum = 0;
  for (let i = 0; i < nums.length; i++) {
    while (qPointer >= 0 && qPointer < queue.length && i - queue[qPointer] > k) {
      qPointer++
    }
    let bestPrev = qPointer >= 0 && qPointer < queue.length ? dp[queue[qPointer]] : 0
    dp[i] = bestPrev + nums[i]
    while (queue.length > 0 && dp[queue[queue.length - 1]] < dp[i]) {
      queue.pop();
      qPointer = Math.min(qPointer, queue.length - 1)
    }
    if (dp[i] > 0) { queue.push(i); qPointer = Math.max(qPointer, 0) }
    maxSum = Math.max(maxSum, dp[i])
    // console.log({ queue, qPointer, dp, bestPrev, i, val:nums[i] })
  }
  return maxSum === 0 ? Math.max(...nums) : maxSum
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
  // if (i !== 4) { return }
  let res = constrainedSubsetSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});