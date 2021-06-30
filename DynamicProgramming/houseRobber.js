// 64ms beats 99%
var rob = function(nums) {
    if (nums.length < 3) {return Math.max(...nums)}
    let dp = [nums[0], nums[1]]
    for (let i = 2; i < nums.length; i++) {
        let max = Math.max(dp[i - 2], (dp[i - 3] || 0))
        dp.push(nums[i] + max)
    }
    return Math.max(...dp.slice(-2))
};

