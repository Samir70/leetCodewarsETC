/**
 * @param {number[]} nums
 * @return {number}
 */
var minDifference = function (nums) {
  var unchanged = nums.length - 3;
  if (unchanged <= 1) { return 0 }
  var sorted = [...nums].sort((a, b) => a - b);
  var left = 0, right = unchanged - 1;
  var minDiff = Infinity;
  while (right < nums.length) {
    var diff = sorted[right] - sorted[left];
    if (diff < minDiff) { minDiff = diff }
    left++
    right++
  }
  return minDiff
};

const tests = [
  { args: [[5, 3, 2, 4]], out: 0 },
  { args: [[1, 5, 0, 10, 14]], out: 1 },
  { args: [[3, 100, 20]], out: 0 },
];

tests.forEach((t, i) => {
  let res = minDifference(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});