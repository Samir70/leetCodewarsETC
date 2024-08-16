/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * https://leetcode.com/problems/find-k-th-smallest-pair-distance/editorial
 */
var smallestDistancePair = function (nums, k) {
  nums.sort((a, b) => a - b)
  let maxVal = nums[nums.length - 1]
  let maxDist = maxVal - nums[0]
  let tally = {}
  for (let n of nums) {
    tally[n] = (tally[n] || 0) + 1
  }
  let prefixCount = Array(maxDist).fill(0)

};

const { nums } = require("./04bigTests")

const tests = [
  { args: [[1, 3, 1], 1], out: 0 },
  { args: [[1, 1, 1], 2], out: 0 },
  { args: [[1, 6, 1], 3], out: 5 },
  { args: [nums, 203], out: 2 },
];

tests.forEach((t, i) => {
  let res = smallestDistancePair(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});