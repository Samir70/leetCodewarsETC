/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  let i = 0
  while (i < nums.length) {
    let n = nums[i]
    if (n <= 0 || n > nums.length || nums[n - 1] === n) { i++; continue }
    nums[i] = nums[n - 1]
    nums[n - 1] = n
  }
  // console.log(nums)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) { return i + 1 }
  }
  return nums.length + 1
};
// var firstMissingPositive = function (nums) {
//   let hash = new Map()
//   for (let n of nums) {
//     if (n > 0 && n <= nums.length) { hash.set(n, true) }
//   }
//   for (let i = 1; i <= nums.length; i++) {
//     if (!hash.has(i)) { return i }
//   }
//   return nums.length + 1 // the 300 elements of nums had all of 1..300
// };

const tests = [
  { args: [[1, 2, 0]], out: 3 },
  { args: [[3, 4, -1, 1]], out: 2 },
  { args: [[7, 8, 9, 11, 12]], out: 1 },
  { args: [[7]], out: 1 },
  { args: [[1]], out: 2 },
  { args: [[1, 1]], out: 2 },
];

tests.forEach((t, i) => {
  let res = firstMissingPositive(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});