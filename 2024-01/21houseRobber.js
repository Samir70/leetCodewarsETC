/**
 * @param {number[]} nums
 * @return {number}
 */
// https://leetcode.com/problems/house-robber/description/?envType=daily-question&envId=2024-01-21
var rob = function (nums) {
  if (nums.length === 1) { return nums[0] }
  let dp = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
    dp.push(Math.max(
      dp[i - 1], (dp[i - 3] || 0) + nums[i], (dp[i - 2] || 0) + nums[i]
    ))
  }
  return dp[nums.length - 1]
};