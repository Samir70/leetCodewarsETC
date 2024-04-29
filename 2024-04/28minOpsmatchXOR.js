/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
  let xor = nums.reduce((a, c) => a ^ c)
  xor ^= k
  let count = 0
  // console.log({ xor, k, count })
  while (xor) {
    xor = xor & (xor - 1)
    count++
    // console.log({ xor, k, count })
  }
  return count
};
// var minOperations = function (nums, k) {
//   let xor = nums.reduce((a, c) => a ^ c)
//   let count = 0
//   // console.log({ xor, k, count })
//   while (xor > 0 || k > 0) {
//     if ((xor % 2) !== (k % 2)) { count++ }
//     xor = xor >> 1
//     k = k >> 1
//     // console.log({ xor, k, count })
//   }
//   return count
// };

const tests = [
  { args: [[2, 1, 3, 4], 1], out: 2 },
  { args: [[2, 1, 3, 4], 1089], out: 4 },
  { args: [[2, 0, 2, 0], 0], out: 0 },
];

tests.forEach((t, i) => {
  let res = minOperations(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});