/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  let m = Math.max(...nums)
  let maxLen = 1, [left, right] = [0, 0]
  while (left < nums.length) {
    right = left
    while (nums[right] === m) {
      right++
    }
    maxLen = Math.max(maxLen, right - left)
    left = right + 1
  }
  return maxLen
};

const { bigtest } = require("./14bigtest")
const tests = [
  { args: [[1, 2, 3, 3, 2, 2]], out: 2 },
  { args: [[1, 2, 3, 3, 2, 2, 6, 4, 6, 6]], out: 2 },
  { args: [[1, 2, 3, 4]], out: 1 },
  { args: [bigtest], out: 56644 }
];

tests.forEach((t, i) => {
  let res = longestSubarray(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});