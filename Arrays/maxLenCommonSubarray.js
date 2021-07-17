var findLength = function(nums1, nums2) {
    let n = nums1.length, m = nums2.length
    let dp = Array(n+1);
    for (let i = 0; i<=n; i++) {dp[i] = Array(m+1).fill(0)}
    let max = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (nums1[i-1] === nums2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                if (dp[i][j] > max) {max = dp[i][j]}
            }
        }
    }
    return max
};
