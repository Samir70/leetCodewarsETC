/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function (nums, k) {
  let [n, maxVal] = [nums.length, Math.max(...nums)]
  let buckets = Array(maxVal + 1).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let d = Math.abs(nums[i] - nums[j])
      buckets[d]++
    }
  }
  for (let d = 0; d < maxVal; d++) {
    k -= buckets[d]
    if (k <= 0) { return d }
  }
  return null
};

const {nums} = require("./04bigTests")

const tests = [
  { args: [[1, 3, 1], 1], out: 0 },
  { args: [[1, 1, 1], 2], out: 0 },
  { args: [[1, 6, 1], 3], out: 5 },
  { args: [nums, 203], out: 2 },
];

tests.forEach((t, i) => {
  let res = smallestDistancePair(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});