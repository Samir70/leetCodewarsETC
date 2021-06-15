// tried to think along lines of:
// Bob scores everything Alice scores, except what he takes
// so the difference ends up being the sum of Bob's choices (bobSum)
// but couldn't implement
// https://leetcode.com/problems/stone-game-vii/discuss/970363/Python-Top-Down-and-Bottom-Up-DP-explained

var stoneGameVII = function(stones) {
    // if (stones.length < 2) {return 0}
    if (stones.length === 2) {return Math.max(...stones)}
    let dp = Array(stones.length);
    let presum = [0];
    for (let i = 0; i < stones.length; i++) {
        presum.push(stones[i] + presum[i]);
        dp[i] = Array(stones.length).fill(0)
    }
    const score = (i, j) => presum[j+1] - presum[i]
    
    for (let i = stones.length - 1; i >= 0; i--) {
        for (let j = i+1; j < stones.length; j++) {
            dp[i][j] = Math.max(score(i+1, j) - dp[i+1][j], score(i, j-1) - dp[i][j-1])
        }
    }
    return dp[0][stones.length - 1]
};

const tests = [
  {stones: [5,3,1,4,2], out:6},
  {stones: [7,90,5,1,100,10,10,2], out:122}
]
