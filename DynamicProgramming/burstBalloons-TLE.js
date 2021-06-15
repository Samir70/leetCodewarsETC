// TLE
let memo = {}
const maxCoins = nums => {
    if (nums.length === 1) { return nums[0] }
    if (nums.length === 2) { return nums[0] * nums[1] + Math.max(...nums) }
    let max = 0
    let key = nums.join(',');
    if (memo[key] !== undefined) { return memo[key] }
    for (let i = 0; i < nums.length; i++) {
        let dropI = nums.slice(0, i).concat(nums.slice(i + 1))
        let left = nums[i - 1] === undefined ? 1 : nums[i - 1]
        let right = nums[i + 1] === undefined ? 1 : nums[i + 1]
        let score = nums[i] * left * right + maxCoins(dropI);
        if (score > max) { max = score }
    }
    memo[key] = max;
    // console.log('worked out', key, max)
    return max
}

const tests = [
    { nums: [3, 1, 5, 8], out: 167 },
    { nums: [1, 5], out: 10 },
    { nums: [3, 4], out: 16 },
    { nums: [1, 3, 4], out: 20 },
    { nums: [2, 1, 3, 4], out: 42 },
    { nums: [5, 1, 2, 1, 3, 4], out: 131 },
    { nums: [5, 2, 1, 3, 4], out: 121 },
    { nums: [5, 2, 3, 4], out: 115 },
    { nums: [5, 3, 4], out: 85 },
    { nums: [5, 4], out: 25 },
    { nums: [1, 2, 1, 3, 4], out: 46 },
    { nums: [1, 2, 3, 4], out: 40 },
    { nums: [1, 2, 4], out: 16 },
    { nums: [1, 2, 3], out: 12 },
    { nums: [2, 3, 4], out: 36 },
    { nums: [1, 20, 4], out: 120 },
    { nums: [2, 20, 4], out: 172 },
    { nums: [5, 2, 1], out: 20 },
    { nums: [1, 3, 4], out: 20 },
    // {
    //     nums: [4, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6, 5, 6, 7, 45, 6, 7, 34, 78, 8, 6],
    //     out: 22882110
    // }
]

tests.forEach((t, i) => console.log(
    'test', i, maxCoins(t.nums) //=== t.out
))