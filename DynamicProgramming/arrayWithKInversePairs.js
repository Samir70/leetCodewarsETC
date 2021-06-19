/**
 * https://leetcode.com/problems/k-inverse-pairs-array/
 * (1, 2, 3, 4, 5)
 * for just 1 inverse pair, pick a number and swap it with the number below, 
 * so 4 choices
 * 
 * for k = 2
 * swap 5&3, 4&2 and 3&1
 * or, for each of those with one pair how many pairs can you get ahead of the swap?
 * 12354 and upto two more from 123  = dp[3, 1] = 2
 * 12435 and one more from 12  = dp[2, 1] = 1
 * 13245 and no more from 1 = dp[1,1] = 0
 */

let base = 10 ** 9 + 7;
var kInversePairs = function (n, k) {
    if (k === 0) { return 1 }
    if (k === 1) { return n - 1 }
    if (k === (n - 1) * n / 2) { return 1 }
    if (k > (n - 1) * n / 2) { return 0 }
    let dpCur = [1n, 1n, 0n, 0n] //output for dp[2,k]
    for (let row = 3; row <= n; row++) {
        let dpNext = [], sum = 0n;
        for (let c = 0; c <= k; c++) {
            sum = sum + (dpCur[c] || 0n) - (dpCur[c - row] || 0n);
            if (sum === 0n) { break }
            dpNext.push(sum)
        }
        dpCur = [...dpNext]
        // console.log(row, dpCur)
    }
    return dpCur[k] % BigInt(base)
};

/**
 * dp[2] = [1, 1, 0, 0]
 * dp[3] = [1, 2, 2, 1]
 * dp[4] = [1, 3, 5, 6, 5, 3, 1]
 * dp[5] = [1, 4, 9, 15, 20, 22, 20, 15, 9, 4, 1]
 * dp[6] = [1, 5, 14, 29, 49, 71, 90, 101, 101, 90, 71, 49, 29, 14, 5, 1]
 */

const tests = [
    { n: 3, k: 0, out: 1 },
    { n: 5, k: 1, out: 4 },
    { n: 5, k: 2, out: 9 },
    { n: 5, k: 10, out: 1 },
    { n: 10, k: 2, out: 44 },
    { n: 10, k: 3, out: 155 },
    { n: 10, k: 4, out: 440 },
    { n: 10, k: 5, out: 1068 },
    { n: 10, k: 6, out: 2298 },
    { n: 10, k: 7, out: 4489 },
    { n: 10, k: 8, out: 8095 },
    { n: 10, k: 9, out: 13640 },
    { n: 10, k: 20, out: 230131 },
    { n: 10, k: 45, out: 1 },
    { n: 10, k: 46, out: 0 },
    { n: 1000, k: 1000, out: 663677020 }
];

tests.forEach((t, i) => console.log(
    'test', i, kInversePairs(t.n, t.k) == t.out
))
