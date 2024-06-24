/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// TLEs
var minKBitFlips = function (nums, k) {
  if (k === 1) {
    return nums.filter(n => n === 0).length
  }
  if (k === nums.length) {
    let zeroes = nums.filter(n => n === 0).length
    return zeroes === 0 ? 0 : zeroes === k ? 1 : -1
  }
  let left = 0, count = 0
  while (left + k <= nums.length) {
    if (nums[left] === 1) {
      left++;
    } else {
      count++;
      let newLeft = left
      for (let right = 0; right < k; right++) {
        if (nums[left + right] && newLeft === left) { newLeft = left + right }
        nums[left + right] = nums[left + right] ? 0 : 1
      }
      left = newLeft === left ? left + k : newLeft
    }
    // console.log({ left, nums })
  }
  // console.log({ left, nums })
  while (left < nums.length) {
    if (nums[left++] === 0) { return -1 }
  }
  return count
};

const { bigNums, bigK } = require("./24bigtest")
const tests = [
  { args: [[0, 1, 0], 1], out: 2 },
  { args: [[0, 1, 0], 2], out: 2 },
  { args: [[1, 0, 0], 2], out: 1 },
  { args: [[0, 0], 2], out: 1 },
  { args: [[0, 0, 1], 2], out: 1 },
  { args: [[1, 1, 0], 2], out: -1 },
  { args: [[0, 1, 0], 3], out: -1 },
  { args: [[1, 1, 1], 3], out: 0 },
  { args: [[1, 1, 0], 2], out: -1 },
  { args: [[0, 0, 0, 1, 0, 1, 1, 0], 3], out: 3 },
  { args: [bigNums, bigK], out: -1 },
]

tests.forEach((t, i) => {
  // if (i !== 6) { return }
  let res = minKBitFlips(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});