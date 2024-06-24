/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// TLEs
var minKBitFlips = function (nums, k) {
  let flipped = Array(nums.length).fill(false)
  let flippedFromLastWindow = 0, flipCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i >= k) {
      if (flipped[i - k]) { flippedFromLastWindow-- }
    }
    if (nums[i] === (flippedFromLastWindow % 2)) {
      if (i + k > nums.length) { return -1 }
      flippedFromLastWindow++
      flipped[i] = true
      flipCount++
    }
  }
  return flipCount
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