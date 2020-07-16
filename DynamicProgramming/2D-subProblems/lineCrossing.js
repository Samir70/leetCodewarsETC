/**
 * if both arrays have only one element then it is trivial to find answer
 * consider two array 
 * [2, 3, 4, 5]
 * [7, 2, 9]
 * if we append the same number to each, then that is an extra line
 * because this lines starts after all the others have started 
 * and it ends after all the others have finished.
 * What if we add two different nunbers: m and n?
 * Consider the two situations
 * [2, 3, 4, 5, m]
 * [7, 2, 9]
 * and
 * [2, 3, 4, 5]
 * [7, 2, 9, n]
 * since m->n itself isn't a new line, the max of the above two will be the number of lines 
 * after adding both m and n
 * 
 * lee215 compares problem to longest common subsequence
 */
const memo = {}
const maxUncrossedLinesOld = (A, B) => {
    var key = A+'##'+B
    if (memo[key] !== undefined) {return memo[key]}
    // console.log('handling', key)
    const lenA = A.length, lenB = B.length;
    if (lenA === 0 || lenB === 0) {memo[key] = 0; return 0}
    if (lenA === 1 && lenB === 1) {
        memo[key] = A[0]===B[0] ? 1 : 0;
        return memo[key]
    }
    if (A[lenA-1] === B[lenB-1]) {
        memo[key] = 1+ maxUncrossedLines(A.slice(0, -1), B.slice(0, -1));
        return memo[key]
    }
    memo[key] = Math.max(
        maxUncrossedLines(A, B.slice(0, -1)),
        maxUncrossedLines(A.slice(0,-1), B)
    );
    return memo[key]
}
// used too much memory

const maxUncrossedLines = (A, B) => {
    const memo = {};
    const helper = (i, j) => {
        var key = i+'##'+j
        if (i<0 || j<0) {return 0};
        if (memo[key] !== undefined) {return memo[key]}
        if (A[i] === B[j]) {
            ans = 1+ helper(i-1, j-1)
        } else {
            ans = Math.max(
                helper(i, j-1), helper(i-1, j)
            )
        }
        memo[key] = ans;
        return ans
    }
    return helper(A.length - 1, B.length-1)
}

// Without recursion
var maxUncrossedLines2 = function(A, B) {
    const dp = new Array(A.length + 1);
    for (let i= 0; i<= A.length; i++) {
        dp[i]= new Array(B.length+1).fill(0);
    }
    
    for(let i = 1; i <= A.length; i++) {
        for(let j = 1; j <= B.length; j++) {
            if (A[i-1] === B[j-1]) {
                dp[i][j]= dp[i-1][j-1] + 1;
            } else {
                dp[i][j]= Math.max(dp[i][j-1], dp[i-1][j]);
            }
                
        }
    }
    return dp[A.length][B.length];
};

const tests = [
    { A: [1, 4, 2], B: [1, 2, 4], out: 2 },
    { A: [2, 5, 1, 2, 5], B: [10, 5, 2, 1, 5, 2], out: 3 },
    { A: [1, 3, 7, 1, 7, 5], B: [1, 9, 2, 5, 1], out: 2 },
    { A: [2, 5, 6, 7, 8, 2], B: [5, 6, 7, 8, 2, 2], out: 5 }
];

tests.forEach(t => console.log(maxUncrossedLines(t.A, t.B), 'should be', t.out))