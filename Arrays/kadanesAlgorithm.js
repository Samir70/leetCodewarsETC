var maxSubArray = function(nums) {
    let sumToHere = nums[0]
    let maxSum = nums[0];
    for (let i = 1; i<nums.length; i++) {
        sumToHere = Math.max(sumToHere + nums[i], nums[i]);
        maxSum = Math.max(maxSum, sumToHere)
    }
    return maxSum
};
