/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProductOld = function (nums) {
  nums.sort((a, b) => b - a)
  return (nums[0] - 1) * (nums[1] - 1)
};

var maxProduct = function (nums) {
  let first = 0, second = 0;
  for (let n of nums) {
    if (n > second) {
      second = n;
      if (second > first) {
        [first, second] = [second, first]
      }
    }
  }
  return (first - 1) * (second - 1)
};

const tests = [
  { args: [[3, 4, 5, 2]], out: 12 },
  { args: [[1, 5, 4, 5]], out: 16 },
  { args: [[3, 7]], out: 12 },
];

tests.forEach((t, i) => {
  let res = maxProduct(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});