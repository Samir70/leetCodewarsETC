const maxCoins = nums => {
    if (nums.length === 1) { return nums[0] }
    if (nums.length === 2) { return nums[0] * nums[1] + Math.max(...nums) }
    // remove zeros and pad with ones so calculting removal of edge is easier.
    nums = [1, ...nums.filter(x => x !== 0), 1]
    // dp[i][j] is how many coins obtained from bursting balloons in interval (i, j)
    let n = nums.length;
    let dp = Array(n)
    for (let i = 0; i < n; i++) { dp[i] = Array(n).fill(0) }

    for (let k = 2; k < n; k++) {
        for (let left = 0; left < n - k; left++) {
            let right = left + k;
            for (let last = left + 1; last < right; last++) {
                dp[left][right] = Math.max(
                    dp[left][right],
                    nums[left] * nums[last] * nums[right] + dp[left][last] + dp[last][right]
                )
            }
            // console.log(k)
            // console.table(dp)
        }
    }
    return dp[0][n - 1]
}

/**
 * for [5, 1, 2, 1, 3, 4], best score of 131 given by bursting balloons in order
 * first 1, second 1, 2, 3, 4, 5
 * go through backwards to work out the score
 * burst the five, padded array looks like
 * [1, 5, 1] scoring 5
 * There's nothing to burst to the left, so which to burst on the right?
 * 5 options score 5, 10, 5, 15, 20
 */

const tests = [
    { nums: [5, 1, 2, 1, 3, 4], out: 131 },
    { nums: [5, 2, 1, 3, 4], out: 121 },
    { nums: [5, 2, 3, 4], out: 115 },
    { nums: [5, 3, 4], out: 85 },
    { nums: [5, 4], out: 25 },
    { nums: [3, 1, 5, 8], out: 167 },
    { nums: [1, 5], out: 10 },
    { nums: [3, 4], out: 16 },
    { nums: [1, 3, 4], out: 20 },
    { nums: [2, 1, 3, 4], out: 42 },
    { nums: [1, 2, 1, 3, 4], out: 46 },
    { nums: [1, 2, 3, 4], out: 40 },
    { nums: [1, 2, 4], out: 16 },
    { nums: [1, 2, 3], out: 12 },
    { nums: [2, 3, 4], out: 36 },
    { nums: [1, 20, 4], out: 120 },
    { nums: [2, 20, 4], out: 172 },
    { nums: [5, 2, 1], out: 20 },
    { nums: [1, 3, 4], out: 20 },
    {
        nums: [4, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6],
        out: 22882110
    }
]

tests.forEach((t, i) => console.log(
    'test', i, maxCoins(t.nums) === t.out
))