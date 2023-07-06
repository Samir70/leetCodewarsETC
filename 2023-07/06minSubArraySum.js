/**
 * Given an array of positive integers nums and a positive integer target, our task is to return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, we have to return 0.
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
// Sliding window
var minSubArrayLen = function(s, nums) {
  if (nums.length === 0) {return 0};
  if (nums.length === 1) {return nums[0] >= s ? 1 : 0}
  let left = 0, right = 1;
  let sum = nums[0] + nums[1]
  let minLen = nums[0] >= s ? 1 : sum >= s ? 2 : Infinity;
  while (right<nums.length) {
      if (sum<s) {
          right++;
          sum += nums[right]
      } else {
          sum -= nums[left];
          left++
      }
      if (sum >= s) {minLen = Math.min(minLen, right-left + 1)}
      // either of the following lines would work
      if (minLen === 1) {return 1}
      // if (left === right) {right++}
  }
  return minLen === Infinity ? 0 : minLen
};