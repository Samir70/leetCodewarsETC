/**
 * @param {number[]} nums
 * @param {number} n
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeSum = function (nums, n, left, right) {
  let sum = 0, cumSums = [0]
  for (let n of nums) {
    sum += n
    cumSums.push(sum)
  }
  let sums = []
  for (let left = 0; left < n; left++) {
    for (let right = left; right < n; right++) {
      sums.push(cumSums[right + 1] - cumSums[left])
    }
  }
  sums.sort((a, b) => a - b) 
  // console.log(sums)
  var base = 1000000007
  return sums.slice(left - 1, right).reduce((a, b) => (a + b) % base, 0)
};


const { nums, n, left, right } = require("./04bigTests")
const tests = [
  { args: [[1, 2, 3, 4], 4, 1, 5], out: 13 },
  { args: [[1, 2, 3, 4], 4, 3, 4], out: 6 },
  { args: [[1, 2, 3, 4], 4, 1, 10], out: 50 },
  { args: [nums, n, left, right], out: 68 }
];

tests.forEach((t, i) => {
  let res = rangeSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});