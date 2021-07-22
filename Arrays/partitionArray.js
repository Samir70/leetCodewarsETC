// 76ms beats 79%
var partitionDisjoint = function(nums) {
    let leftEnd = 0, leftMax = nums[0];
    let maxSeen = nums[0];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < leftMax) {
            leftEnd = i;
            leftMax = maxSeen;
        } else {
            if (nums[i] > maxSeen) {maxSeen = nums[i]}
        }
    }
    return leftEnd + 1
};
