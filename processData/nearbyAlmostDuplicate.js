var containsNearbyAlmostDuplicate = function(nums, k, t) {
    nums = nums.map((n, i) => [n, i])
    nums.sort((a, b) => a[0] - b[0])
    console.log(nums)
    for (let i = 0; i < nums.length; i++) {
        let left = nums[i]
        let r = i+1;
        while (r < nums.length) {
            let right = nums[r]
            r++
            if (Math.abs(right[1] - left[1]) > k) {continue}
            if (right[0] - left[0] <= t) {
                return true
            } else {
                r = 10000000
            }
        }
    }
    return false
};
