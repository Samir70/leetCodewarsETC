/**
 * Given two words word1 and word2, find the minimum number of operations required to 
 * convert word1 to word2.

You have the following 3 operations permitted on a word:

    Insert a character
    Delete a character
    Replace a character

 */

// edit distance or Levenshtein distance
const minDistanceHighMem = (word1, word2) => {
    word1 = 'x'+word1;
    word2 = 'x'+word2;
    var dp = [];
    for (var i=0; i<word1.length; i++) {
        dp.push([]); // add a new row to matrix
        for (var j=0; j<word2.length; j++) {
            var dist = -1;
            if (i === 0 || j===0) {
                dist = Math.max(i, j)
            } else {
                var above = dp[i-1][j] + 1;
                var left = dp[i][j-1] + 1;
                var diag = dp[i-1][j-1];
                if (word1[i] !== word2[j]) {diag++}
                dist = Math.min(above, left, diag)
            }
            dp[i].push(dist)
            // console.log(dp)
        }
    }
    return dp[i-1][j-1]
}

// 88ms beats 99%
var minDistance = function(a, b) {
    const m = a.length, n = b.length;
    let prev = [...Array(n+1).keys()]
    for (let i = 1; i <= m; i++) {
        let cur = Array(n+1);
        cur[0] = i;
        for (let j = 1; j <= n; j++) {
            if (a[i-1] === b[j-1]) {
                cur[j] = prev[j-1]
            } else {
                cur[j] = Math.min(prev[j], prev[j-1], cur[j-1]) + 1
            }
        }
        prev = [...cur]
    }
    return prev[n]
};

const tests = [
    { word1: "horse", word2: "ros", out:3},
    // hors;hos; ros
    {word1: "intention", word2: "execution", out:5},
    // replace first 5 character
    {word1: "extection", word2: "execution", out:2},
    // exection; execution
    {word1: "abcde", word2: "edcba", out:4},
    {word1: "abcdef", word2: "fedcba", out:6}
]

tests.forEach(t => console.log(t.word1, 'to', t.word2, 'takes', minDistance(t.word1, t.word2), 'should be', t.out))