/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
  if (nums.length === 0) { return 0 }
  let diffs = { 0: -1 }
  let ones = 0, zeros = 0;
  let best = 0;
  for (let i = 0; i < nums.length; i++) {
    let n = nums[i];
    n === 0 ? zeros++ : ones++
    let diff = zeros - ones
    if (diffs[diff] === undefined) {
      diffs[diff] = i
    } else {
      best = Math.max(best, i - diffs[diff])
    }
  }
  return best
};

const tests = [
  { args: [[0, 1]], out: 2 },
  { args: [[0, 1, 0]], out: 2 },
];

tests.forEach((t, i) => {
  let res = findMaxLength(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});