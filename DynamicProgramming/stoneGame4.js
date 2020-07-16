/**
 * Given n stones, A and B take turns to remove a square number of stones
 * winner is player to take last stone.
 * A goes first, return true if A wins with best play on both sides.
 */
var winnerSquareGame = function(n) {
    var outcomes = Array(n+1).fill(0);
    var sq = 1, i = 1;
    while (sq<=n) {
        if (n === sq) {return true}
        outcomes[sq] = true;
        i++;
        sq = i*i
    }
    var p = 1;
    while (p<=n) {
        if (outcomes[n] === true) {return true}
        while (outcomes[p] !== 0) {p++}
        outcomes[p] = false;
        i = 1; sq=1;
        while (p+sq <= n) {
            outcomes[p+sq] = true;
            i++;
            sq = i*i
        }
        p++
        // console.log(outcomes.join(','))
    }
    return outcomes[n]
};

/**
 * Shorter:
 * public boolean winnerSquareGame(int n) {
        boolean[] dp = new boolean[n + 1];
        for (int i = 1; i <= n; ++i) {
            for (int k = 1; k * k <= i; ++k) {
                if (!dp[i - k * k]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
 */

const tests = [
    {in:1, out:true},
    {in:2, out:false},
    {in:4, out:true},
    {in:7, out:false},
    {in:17, out:false}
]