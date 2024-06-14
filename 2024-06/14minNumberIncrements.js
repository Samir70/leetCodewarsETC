/**
 * @param {number[]} nums
 * @return {number}
 */
// Is not any faster than next, with or without using min
var minIncrementForUnique = function (nums) {
  let count = 0
  let max = Math.max(...nums)
  let freq = Array(nums.length + max).fill(0)
  let min = 10 ^ 9
  for (let n of nums) { freq[n]++; min = Math.min(min, n) }
  nums.sort((a, b) => a - b)
  for (let i = min; i < freq.length; i++) {
    if (freq[i] <= 1) { continue }
    freq[i + 1] += freq[i] - 1
    count += freq[i] - 1
  }
  return count
};
// O(nlogn)
// var minIncrementForUnique = function (nums) {
//   let count = 0
//   nums.sort((a, b) => a - b)
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] <= nums[i - 1]) {
//       count += nums[i - 1] + 1 - nums[i]
//       nums[i] = nums[i - 1] + 1
//     }
//   }
//   return count
// };
// TLEs on bigtest
// var minIncrementForUnique = function (nums) {
//   let count = 0
//   nums.sort((a, b) => a - b)
//   let seen = new Set()
//   for (let n of nums) {
//     if (!seen.has(n)) {
//       seen.add(n)
//     } else {
//       let firstUnseen = n
//       while (seen.has(firstUnseen)) { firstUnseen++ }
//       seen.add(firstUnseen)
//       count += firstUnseen - n
//     }
//   }
//   return count
// };

const { bigtest } = require('./14bigtest')

const tests = [
  { args: [[1, 2, 2]], out: 1 },
  { args: [[0, 2, 2]], out: 1 },
  { args: [[2, 2, 2]], out: 3 },
  { args: [[3, 2, 1, 2, 1, 7]], out: 6 }, // [1,1,2,2,3,7]
  { args: [bigtest], out: 267681252 },
];

tests.forEach((t, i) => {
  let res = minIncrementForUnique(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});