// 92ms beats 71%
// (there is a faster version using a binary search)
var lengthOfLIS = function(nums) {
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

const tests = [
  {in: [10,9,2,5,3,7,101,18], out:4},
  {in: [], out:0}
];

tests.forEach(t => console.log(
  t, lengthOfLIS(t.in), 'should be', t.out
))
