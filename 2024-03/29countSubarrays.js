/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * Return the number of subarrays where the 
 * maximum element of nums appears at least k times in that subarray.
 */
var countSubarrays = function (nums, k) {
  let max = Math.max(...nums)
  let [count, ans, left, right] = [0, 0, 0, 0]
  while (right < nums.length) {
    let n = nums[right]
    if (n === max) { count++ }
    while (count > k && left < right) {
      let canDrop = nums[left]
      if (canDrop === max) { count-- }
      left++
    }
    while (nums[left] !== max) { left++ }
    if (count >= k) { ans += left + 1 }
    right++
  }
  return ans
};

const tests = [
  { args: [[1, 3, 2, 3, 3], 2], out: 6 },
  { args: [[1, 4, 2, 1], 3], out: 0 },
  { args: [[1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3], 2], out: 102 },
  { args: [[1, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3], 2], out: 154 }
];

tests.forEach((t, i) => {
  let res = countSubarrays(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});