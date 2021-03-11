// find the smallest number of coins which add up to amount
var coinChange = function (coins, amount) {
    let dp = Array(amount + 1);
    dp[0] = 0;
    let sum = 1;
    while (sum <= amount) {
        for (let c of coins) {
            if (sum - c >= 0 && dp[sum - c] !== -1) {
                dp[sum] = Math.min(dp[sum] || Infinity, dp[sum - c] + 1)
            }
        }
        if (dp[sum] === undefined) { dp[sum] = -1 }
        sum++
    }
    return dp[amount]
};

const tests = [
    { coins: [1, 2, 5], amount: 11, out: 3 }
]