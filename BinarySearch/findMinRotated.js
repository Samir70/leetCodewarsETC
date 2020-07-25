/**
 * array sorted in ascending order, but rotated. 
 * No duplicates.
 * find min value
 */

var findMinOld = function (nums) {
    var left = 0, right = nums.length - 1;
    if (nums[left] < nums[right]) { return nums[left] }
    while (true) {
        var mid = Math.floor((left + right) / 2);
        console.log(left, right, mid)
        if (right - left === 1) { return nums[right] }
        if (mid === 0 || nums[mid - 1] > nums[mid]) { return nums[mid] };
        if (nums[mid] < nums[left]) {
            right = mid
        } else {
            left = mid
        }
    }
};

var findMin = nums => {
    var left = 0, right = nums.length - 1;
    while (left < right) {
        var mid = left + Math.floor((right - left)/2); // avoid overflow
        // nums is split into two arrays
        // [0, mid] and [mid+1, right]
        // where is the inflection point?
        if (nums[mid] < nums[right]) {
            // the second array is sorted, no infleciton point
            right = mid; // check the first array
        } else {
            // the second array must contain a step down to min value
            left = mid+1    
        }
    }
    return nums[left]
}

const tests = [
    { in: [1, 2, 3, 4, 5, 6, 7, 8], out: 1 },
    { in: [10, 11, 1, 2, 3, 4, 5, 6, 7, 8], out: 1 },
    { in: [4, 5, 6, 7, 8, 9, 10, 11, 1, 2, 3], out: 1 },
    { in: [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3], out: 1 },
    { in: [2, 3, 4, 5, 6, 7, 8, 1], out: 1 },
    { in: [2, 3, 4, 5, 6, 7, 8, 9, 1], out: 1 },
    { in: [2, 1], out: 1 },
    { in: [1, 2], out: 1 },
    { in: [3, 4, 5, 1, 2], out: 1 }
];

tests.forEach((t, i) => console.log(
    'test', i, findMin(t.in)
))