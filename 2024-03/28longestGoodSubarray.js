/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function (nums, k) {
  let [maxLength, left, right] = [0, 0, 0]
  let tally = {}
  while (right < nums.length) {
    let n = nums[right]
    tally[n] = (tally[n] || 0) + 1
    while (tally[n] > k && left < right) {
      let leftNum = nums[left++]
      tally[leftNum]--
    }
    maxLength = Math.max(maxLength, right - left + 1)
    // console.log({ tally, left, right, maxLength })
    right++
  }
  return maxLength
};

const tests = [
  { args: [[1, 2, 3, 1, 2, 3, 1, 2], 2], out: 6 },
  { args: [[1, 2, 1, 2, 1, 2, 1, 2], 1], out: 2 },
  { args: [[5, 5, 5, 5, 5, 5, 5], 4], out: 4 },
  { args: [[1, 4, 4, 3], 1], out: 2 },
];

tests.forEach((t, i) => {
  let res = maxSubarrayLength(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});