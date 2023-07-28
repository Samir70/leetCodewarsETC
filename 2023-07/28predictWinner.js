/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function (nums) {
  if (nums.length < 3) { return true }
  if (nums.length % 2 === 0) { return true }
  let memo = {}
  const maxDiff = (left, right) => {
    if (left === right) { return nums[left] }
    let key =  [left, right].join(",")
    if (memo[key] !== undefined) {return memo[key]}
    let takeLeft = nums[left] - maxDiff(left + 1, right)
    let takeRight = nums[right] - maxDiff(left, right - 1)
    memo[key] = Math.max(takeLeft, takeRight)
    return memo[key]
  }
  return maxDiff(0, nums.length - 1) >= 0
};

const tests = [
  { args: [[1, 5, 2]], out: false },
  { args: [[0]], out: true },
  { args: [[1, 5, 233, 7]], out: true },
  { args: [[345, 64, 34, 4, 3, 3, 5, 34, 5, 4, 32, 6, 3425, 5432, 6, 4, 3, 6, 7, 292]], out: true },
  { args: [[1, 2, 3, 4, 999, 3]], out: true },
  { args: [[10, 10, 2, 2, 454, 2, 2, 10, 10]], out: false }
];

tests.forEach((t, i) => {
  // if (i !== 5) { return }
  let res = PredictTheWinner(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});