/**
 * @param {number} n
 * @return {number}
 */
var minimumOneBitOperations = function (n) {
  // gray codes
  let ans = n;
  ans ^= ans >> 16
  ans ^= ans >> 8
  ans ^= ans >> 4
  ans ^= ans >> 2
  ans ^= ans >> 1
  return ans
};
// var minimumOneBitOperations = function (n) {
//   if (n === 0) { return 0 }
//   let binary = n.toString(2)
//   let left = 2 ** (binary.length - 1)
//   let right = n - left
//   // console.log({ n, binary, left, right })
//   return left * 2 - 1 - minimumOneBitOperations(right)
// };


/**
 * For any given operation you perform, you may only modify:

    The rightmost bit
    The bit to the left of the rightmost 1 bit.

 */
const tests = [
  { args: [2], out: 3 }, // 10 => 11 => 01 => 00
  { args: [4], out: 7 }, // 100 => 101 => 111 => 110
  { args: [8], out: 15 },
  { args: [16], out: 31 },
  { args: [3], out: 2 }, // 11 => 01 => 00
  { args: [7], out: 5 }, // 111 => 110 + 4 more
  { args: [15], out: 10 }, // 1111 => 1101 => 1100 => 0100 and 7 more
  { args: [31], out: 21 },
  { args: [63], out: 42 },
  { args: [6], out: 4 }, // 110 => 010 => 11 => 01 => 00
  { args: [12], out: 8 }, // 8 takes 15, 4 takes 7 and 15 - 7 = 8
  { args: [24], out: 16 }, // double what it takes for 12
  { args: [23], out: 26 },
  /**
   * 23: split as 16 + 7
   * 16 takes 16*2 - 1 = 31
   * 7: split as 4 and 3
   * 4 takes 4*2 - 1 = 7
   * 3: split as 2 and 1
   * 2 takes 3
   * 1 takes 1
   * So 3 takes 3 - 1 = 2
   * 7 takes 7 - 2 = 5
   * 23 takes 31 - 5 = 26
  */
  { args: [1000000000], out: 756249599 },
];

tests.forEach((t, i) => {
  let res = minimumOneBitOperations(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});