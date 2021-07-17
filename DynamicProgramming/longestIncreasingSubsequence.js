// 92ms beats 71%
// (there is a faster version using a binary search)
var lengthOfLIS_SLOW = function(nums) {
    if (nums.length === 0) {return 0}
    // LIS ending at index i
    let dp = Array(nums.length - 1)
    dp[0] = 1;
    let cur = 1;
    while (cur < nums.length) {
        let i = 0;
        let longestPrev = 1
        while (i < cur) {
            if (nums[i] < nums[cur]) {
                longestPrev = Math.max(longestPrev, dp[i] + 1)
            }
            i++;
        }
        dp[cur] = longestPrev
        cur++
    }
    return Math.max(...dp)
};

// 72ms, beats 99.66%
var lengthOfLIS = function(nums) {
    // store the last in subsequence of length i
    let tails = [-Infinity]
    for (let n of nums) {
        let left = 0, right = tails.length;
        while (left < right) {
            let mid = Math.floor((left + right) / 2)
            if (tails[mid] < n) {
                left = mid + 1
            } else {
                right = mid
            }
        }
        if (tails[left] === undefined) {tails[left] = n}
        if (n < tails[left]) {tails[left] = n}
        // console.log(tails)
    }
    return tails.length - 1
};

const tests = [
  {in: [10,9,2,5,3,7,101,18], out:4},
  {in: [], out:0}
];

tests.forEach(t => console.log(
  t, lengthOfLIS(t.in), 'should be', t.out
))
