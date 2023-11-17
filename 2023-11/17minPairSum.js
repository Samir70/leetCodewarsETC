/**
 * @param {number[]} nums
 * @return {number}
 */
var minPairSum = function (nums) {
  nums.sort((a, b) => a - b)
  let left = 0, right = nums.length - 1;
  let out = nums[right] + nums[0]
  while (left < right) {
    right--; left++;
    let sum = nums[right] + nums[left]
    if (sum > out) { out = sum }
  }
  return out
};

const tests = [
  { args: [[3, 5, 2, 3]], out: 7 },
  { args: [[3, 5, 4, 2, 4, 6]], out: 8 },
];

tests.forEach((t, i) => {
  let res = minPairSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});