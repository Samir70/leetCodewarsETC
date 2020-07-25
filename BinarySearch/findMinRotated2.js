/**
 * array sorted in ascending order, but rotated. 
 * Duplicates are allowed in this version
 * find min value
 */

var findMin = nums => {
    var left = 0, right = nums.length - 1;
    // what if there is a loop round?
    // [3, 3, 1, 3] or [10, 1, 10, 10, 10] or [1, 1, 3, 1]
    while (nums[left+1] === nums[left]) {left++}
    while (nums[right-1] === nums[right]) {right--}
    // so worst case is O(n), but on average it will do better
    while (left < right) {
        var mid = left + Math.floor((right - left) / 2); // avoid overflow
        // nums is split into two arrays
        // [0, mid] and [mid+1, right]
        // where is the inflection point?
        if (nums[mid] <= nums[right]) {
            // the second array is sorted, no infleciton point
            // no wrapping of this mid value since [3, 1, 3, 3] has been dealt with
            // since that is handled before loop 
            right = mid; // check the first array
            while (nums[right] === nums[right - 1]) { right-- }
        } else {
            // the second array must contain a step down to min value
            left = mid + 1
            while (nums[left] === nums[left + 1]) { left++ }
        }
    }
    return nums[left]
}

const tests = [
    { in: [1, 2, 3, 4, 4, 4, 4, 5, 5, 5, 6, 7, 8, 8, 8, 8], out: 1 },
    { in: [1, 1, 1, 2, 3, 4, 5, 6, 7, 8], out: 1 },
    { in: [4, 5, 6, 7, 8, 9, 10, 11, 1, 1, 1], out: 1 },
    { in: [1, 1, 1, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 1, 1], out: 1 },
    { in: [1, 1, 1, 2, 1, 1, 1, 1, 1, 1], out: 1 },
    { in: [3, 4, 1, 1, 1, 1, 1, 1, 2, 3], out: 1 },
    { in: [4, 5, 6, 6, 6, 7, 8, 8, 9, 10, 11, 12, 1, 2, 3], out: 1 },
    { in: [2, 3, 4, 4, 4, 4, 4, 4, 5, 6, 7, 8, 1], out: 1 },
    { in: [2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1], out: 1 },
    { in: [2, 1], out: 1 },
    { in: [1, 2], out: 1 },
    { in: [3, 4, 5, 5, 5, 5, 5, 5, 1, 2], out: 1 },
    { in: [1, 3, 3], out: 1 },
    { in: [3, 1, 1], out: 1 },
    { in: [3, 3, 1, 3], out: 1 },
    { in: [10, 1, 10, 10, 10], out: 1 }
];

tests.forEach((t, i) => console.log(
    'test', i, findMin(t.in)
))