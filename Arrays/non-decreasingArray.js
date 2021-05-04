// https://leetcode.com/problems/non-decreasing-array/
// beats 90%
var checkPossibility = function(nums) {
    let min = -10000;
    let madeChange = false;
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i+1]) {
            if (madeChange) {return false}
            if (nums[i+1] < min && nums[i] > nums[i+2]) {return false}
            madeChange = true
        }
        min = nums[i]
    }
    return true
};
