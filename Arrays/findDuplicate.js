/**
 * Only one duplicate, and nums[i] all between 1 and nums.length - 1 inclusive.
 * Duplicate may be repeated any number of times
 * 
 * Use a set, but memeory is O(n)
 * Sort, but O(nlogn) time or extra memory
 * Find cycle via Floyds Tortoise and Hare and f(x) = nums[x] to find cycle
 * or
 */

var findDuplicate = function(nums) {
    var out = 0
    while (out<nums.length) {
        if (nums[Math.abs(nums[out])] > 0) {
            nums[Math.abs(nums[out])] *= -1
            // console.log(nums)
        } else {
            for (var i = 0; i<nums.length; i++) {nums[i] = Math.abs(nums[i])}
            // console.log(nums)
            return nums[out]
        } 
        out++
    }
    return -1
};