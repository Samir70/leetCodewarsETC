// allow only two of a value in sorted array
// https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
// 80ms beats 96%
var removeDuplicates = function(nums) {
    if (nums.length < 3) {return nums.length}
    let left = 1, right = 2, skipped = 0;
    while (right < nums.length) {
        while (nums[right] === nums[left] && nums[right] === nums[left-1]) {right++}
        if (right < nums.length) {left++; nums[left] = nums[right]}
        right++
    }
    return left+1
};