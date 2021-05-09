var minDistance = function(word1, word2) {
    // find LCS
    let dp = Array(word1.length + 1);
    for (let i = 0; i<dp.length; i++ ) {
        dp[i] = Array(word2.length + 1).fill(0)
    }
    for (let r = 1; r < dp.length; r++) {
        for (let c = 1; c < dp[0].length; c++) {
            if (word1[r-1] === word2[c-1]) {
                dp[r][c] = dp[r-1][c-1] + 1
            } else {
                dp[r][c] = Math.max(dp[r][c-1], dp[r-1][c])
            }
        }
    }
    return word1.length + word2.length - 2*dp[word1.length][word2.length]
};
