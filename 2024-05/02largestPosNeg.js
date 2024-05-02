/**
 * @param {number[]} nums
 * @return {number}
 * nums[i] !== 0
 * returns max n such that n and -n in nums
 */
// beats 91%
var findMaxK = function (nums) {
  let numSet = new Set()
  let ans = -1
  for (let n of nums) {
    if (numSet.has(-n)) {
      ans = Math.max(ans, Math.abs(n))
    } else {
      numSet.add(n)
    }
  }
  return ans
};
// sorting, O(nlogn) beats 48%
// var findMaxK = function (nums) {
//   nums.sort((a, b) => a - b)
//   let left = 0, right = nums.length - 1
//   while (left < right) {
//     if (nums[right] === -nums[left]) {
//       return nums[right]
//     }
//     if (nums[left] > 0) { return -1 }
//     -nums[left] < nums[right] ? right-- : left++
//   }
//   return -1
// };
// effectively two passes, O(n) beats 95%
// var findMaxK = function (nums) {
//   let numSet = new Set(nums)
//   let ans = -1
//   for (let n of nums) {
//     if (n > 0 && numSet.has(-n)) {
//       ans = Math.max(ans, n)
//     }
//   }
//   return ans
// };

const tests = [
  { args: [[-1, 2, -3, 3]], out: 3 },
  { args: [[-1, 10, 6, 7, -7, 1]], out: 7 },
  { args: [[-10, 8, 6, 7, -2, -3]], out: -1 },
];

tests.forEach((t, i) => {
  let res = findMaxK(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});