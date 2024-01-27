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
    return Number(dpCur[k] % BigInt(base))
};

/**
 * dp[2] = [1, 1, 0, 0]
 * dp[3] = [1, 2, 2, 1]
 * dp[4] = [1, 3, 5, 6, 5, 3, 1]
 * dp[5] = [1, 4, 9, 15, 20, 22, 20, 15, 9, 4, 1]
 * dp[6] = [1, 5, 14, 29, 49, 71, 90, 101, 101, 90, 71, 49, 29, 14, 5, 1]
 */

const tests = [
    { args: [3, 0], out: 1 },
    { args: [5, 1], out: 4 },
    { args: [5, 2], out: 9 },
    { args: [5, 10], out: 1 },
    { args: [10, 2], out: 44 },
    { args: [10, 3], out: 155 },
    { args: [10, 4], out: 440 },
    { args: [10, 5], out: 1068 },
    { args: [10, 6], out: 2298 },
    { args: [10, 7], out: 4489 },
    { args: [10, 8], out: 8095 },
    { args: [10, 9], out: 13640 },
    { args: [10, 20], out: 230131 },
    { args: [10, 45], out: 1 },
    { args: [10, 46], out: 0 },
    { args: [1000, 1000], out: 663677020 }
];

tests.forEach((t, i) => {
  let res = kInversePairs(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});