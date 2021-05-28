// https://leetcode.com/problems/maximum-erasure-value/
var maximumUniqueSubarray = function(nums) {
    let used = new Set()
    let left = 0, right = 0;
    let max = 0, sum = 0;
    while (right < nums.length) {
        let cur = nums[right]
        sum += cur
        if (used.has(cur)) {
            while (nums[left] !== cur) {
                used.delete(nums[left])
                sum -= nums[left]
                left++
            }
            sum -= nums[left]
            left++
        } else {
            if (max < sum) {max = sum}
        }
        used.add(cur)
        right++
    }
    return max
};

const tests = [
  [4,2,4,5,6], [5,2,1,2,5,2,1,2,5]
]

const outs = [17, 8]
