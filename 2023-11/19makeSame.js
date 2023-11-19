/**
 * @param {number[]} nums
 * @return {number}
 */
var reductionOperations = function (nums) {
  nums.sort((a, b) => b - a)
  let ops = 0, cur = nums[0];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === cur) { continue }
    ops += i; 
    cur = nums[i]
  }
  return ops
};

const tests = [
  { args: [[5, 1, 3]], out: 3 },
  { args: [[1, 1, 1]], out: 0 },
  { args: [[1, 1, 2, 2, 3]], out: 4 },
];

tests.forEach((t, i) => {
  let res = reductionOperations(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});