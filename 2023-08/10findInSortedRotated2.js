/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
/**
 * Aftger rotation, we have two sorted subarrays. [...F, ...S]
 * Also, all the elements of S will be smaller or equal to 
 * the first element of F.
 */
const valueCannotBeInSecondSubarray = (startOfFirst, val) => startOfFirst <= val
var search = function (nums, target) {
  let left = 0, right = nums.length - 1
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) { return true }
    if (nums[mid] === nums[left]) {
      // cannot decide which subarray the mid element is in
      // so binary search not useful
      left++
    } else {
      let midInFirst = valueCannotBeInSecondSubarray(nums[left], nums[mid])
      let targetInFirst = valueCannotBeInSecondSubarray(nums[left], target)
      // console.log({ left, mid, right, target, arr: nums.slice(left, right + 1), midInFirst, targetInFirst })
      if (midInFirst && !targetInFirst) {
        left = mid + 1
      }
      if (!midInFirst && targetInFirst) {
        right = mid - 1
      }
      if (midInFirst && targetInFirst) {
        if (nums[mid] < target) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
      if (!midInFirst && !targetInFirst) {
        if (nums[mid] < target) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
    }
  }
  return nums[left] === target
};

const tests = [
  { args: [[2, 5, 6, 0, 0, 1, 2], 0], out: true },
  { args: [[2, 5, 6, 0, 0, 1, 2], 5], out: true },
  { args: [[2, 5, 6, 0, 0, 1, 2], 6], out: true },
  { args: [[2, 5, 6, 0, 0, 1, 2], 3], out: false },
  { args: [[2, 5, 6, 7, 0, 1, 2], 0], out: true },
  { args: [[2, 5, 6, 7, 0, 1, 2], 3], out: false },
  { args: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 2], out: true },
];

tests.forEach((t, i) => {
  // if (i !== 6) { return }
  let res = search(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});