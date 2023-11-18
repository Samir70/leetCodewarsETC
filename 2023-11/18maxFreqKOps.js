/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function (nums, k) {
  nums.sort((a, b) => b - a)
  let maxFreq = 0, freq = 0, ops = k;
  let left = 0, right = 0;
  // console.log(nums)
  while (right < nums.length) {
    let taller = nums[left], shorter = nums[right];
    let shortfall = taller - shorter;
    if (shortfall <= ops) {
      freq++;
      ops -= shortfall;
      right++
      maxFreq = Math.max(maxFreq, freq)
      // if (taller > shorter) { console.log({ l: taller, r: shorter, shortfall, ops, freq }) }
    } else {
      left++
      let drop = taller - nums[left]
      ops += drop * (right - left)
      freq--
      // console.log({ drop, left, right, ops, freq })
    }
  }
  return maxFreq
};
const { bigtest } = require('./18bigtest')
const tests = [
  { args: [[1, 2, 4], 5], out: 3 },
  { args: [[1, 4, 8, 13], 5], out: 2 },
  { args: [[3, 9, 6], 2], out: 1 },
  { args: bigtest, out: 2132 },
];

tests.forEach((t, i) => {
  let res = maxFrequency(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});