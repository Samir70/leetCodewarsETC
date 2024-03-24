/**
 * Only one duplicate, and nums[i] all between 1 and nums.length - 1 inclusive.
 * Duplicate may be repeated any number of times
 * 
 * Use a set, but memeory is O(n)
 * Sort, but O(nlogn) time or extra memory
 * Find cycle via Floyds Tortoise and Hare and f(x) = nums[x] to find cycle
 * or
 */

var findDuplicate = function (nums) {
  var out = 0
  while (out < nums.length) {
    if (nums[Math.abs(nums[out])] > 0) {
      nums[Math.abs(nums[out])] *= -1
      // console.log(nums)
    } else {
      for (var i = 0; i < nums.length; i++) { nums[i] = Math.abs(nums[i]) }
      // console.log(nums)
      return nums[out]
    }
    out++
  }
  return -1
};

// slower, but illustrates use of BS for range rather than index
var findDuplicate2 = function (nums) {
  let left = 1, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    let count = 0;
    for (let n of nums) { if (n <= mid) { count++ } }
    if (count <= mid) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
};

const tests = [
  { args: [[1, 3, 4, 2, 2]], out: 2 },
  { args: [[3, 1, 3, 4, 2]], out: 3 },
];

tests.forEach((t, i) => {
  let res = findDuplicate(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});