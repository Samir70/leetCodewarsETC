/**
 * nums is sorted, but rotated. eg: 
 * [0, 1, 2, 4, 5, 6, 7] becomes [4, 5, 6, 7, 0, 1, 2]
 * After finidng mid, we split this subarray into 3 parts:

    subarray nums[left ~ mid - 1]
    element nums[mid].
    subarray nums[mid + 1, right].

 * One of the subarrays is completely sorted, the other may contain a pivot point
 */

var search1 = function (nums, target) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    // console.log(left, right, mid)
    if (nums[mid] === target) { return mid }
    let pivotToRight = nums[right] < nums[mid] ? true : false;
    if (nums[mid] < target) {
      if (pivotToRight) {
        // every to the left of mid is sorted, so target cannot be there
        left = mid + 1
      } else {
        // check if target is on the right, which is all sorted
        if (target <= nums[right]) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
    } else {
      // now target <= nums[mid]
      if (!pivotToRight) {
        // everything to the right of mid is sorted, and bigger than mid value
        right = mid - 1
      } else {
        // check if target is on left, which is all sorted
        if (target >= nums[left]) {
          right = mid - 1
        } else {
          left = mid + 1
        }
      }
    }
  }
  return nums[left] === target ? left : -1
};

// Beats 42%
const search = (nums, target) => {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) { return mid }
    let tellTale = (nums[mid] < nums[0]) === (target < nums[0]) ? nums[mid] :
      target < nums[0] ? -Infinity : Infinity;
    if (tellTale < target) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return nums[left] === target ? left : -1
}

const tests = [
  { args: [[4, 5, 6, 7, 0, 1, 2], 0], out: 4 },
  { args: [[4, 5, 6, 7, 0, 1, 2], 3], out: -1 },
  { args: [[1], 0], out: -1 },
  { args: [[1], 1], out: 0 },
  { args: [[1, 2], 2], out: 1 },
  { args: [[1, 2, 3], 3], out: 2 }
];

tests.forEach((t, i) => {
  let res = search(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});