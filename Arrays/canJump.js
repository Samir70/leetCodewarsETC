var canJump = function(nums) {
    if (nums.length === 1) {return true}
    let i = nums.length - 2;
    let jumpNeeded = 1;
    while (i > 0) {
        if (nums[i] >= jumpNeeded) {
            jumpNeeded = 1
        } else {
            jumpNeeded++
        }
        i--
    }
    return nums[0] >= jumpNeeded
};