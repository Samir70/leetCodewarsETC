/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function (nums) {
  nums.sort((a, b) => a - b)
  let sums = [], sum = 0;
  for (let n of nums) {
    sum += n;
    sums.push(sum)
  }
  for (let i = nums.length - 1; i >= 2; i--) {
    if (sums[i - 1] > nums[i]) { return sums[i] }
  }
  return -1
};

const { bigtest } = require("../2024-01/20bigtest")
const tests = [
  { args: [[5, 5, 5]], out: 15 },
  { args: [[1, 12, 1, 2, 5, 50, 3]], out: 12 },
  { args: [[5, 5, 50]], out: -1 },
  { args: [bigtest], out: 448670039 }
];

tests.forEach((t, i) => {
  let res = largestPerimeter(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});