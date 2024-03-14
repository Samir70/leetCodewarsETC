/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function (nums, goal) {
  const freqOfSum = { 0: 1 }
  let count = 0, sum = 0
  for (let n of nums) {
    sum += n
    count += freqOfSum[sum - goal] || 0
    freqOfSum[sum] = (freqOfSum[sum] || 0) + 1
  }
  return count
};
// var numSubarraysWithSum = function (nums, goal) {
//   const waysEndingAtI = Array(nums.length).fill(0)
//   let [left, right, indexFirstZero, sum] = [0, 0, -1, 0]
//   while (right < nums.length) {
//     sum += nums[right]
//     while (sum > goal && left < right) {
//       indexFirstZero = left
//       sum -= nums[left++]
//     }
//     if (sum === goal) {
//       while (left < right && nums[left] === 0) { left++ }
//       waysEndingAtI[right] = left - indexFirstZero
//     }
//     right++
//   }
//   // console.log({ waysEndingAtI, left, right, sum, indexFirstZero })
//   return waysEndingAtI.reduce((a, c) => a + c)
// };
// TLEs
// var numSubarraysWithSum = function (nums, goal) {
//   let cumSum = [], sum = 0
//   for (let n of nums) {
//     sum += n
//     cumSum.push(sum)
//   }
//   let count = 0
//   for (let right = 0; right < nums.length; right++) {
//     for (let left = 0; left <= right; left++) {
//       let subarraySum = cumSum[right]
//       if (left > 0) { subarraySum -= cumSum[left - 1] }
//       if (subarraySum === goal) {count++}
//     }
//   }
//   return count
// };

const tests = [
  { args: [[1, 0, 1, 0, 1], 2], out: 4 },
  { args: [[1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0], 3], out: 23 },
  { args: [[0, 0, 0, 0, 0], 0], out: 15 },
  { args: [[0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 0], out: 27 },
];

tests.forEach((t, i) => {
  // if (i !== 3) { return }
  let res = numSubarraysWithSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});