const countChars = s => {
    let zeros = 0, ones = 0;
    for (let c of s) {
        c === '1' ? ones++ : zeros++
    }
    return [zeros, ones]
}


const findMaxForm = (strs, m, n) => {
    let dp = [...Array(m + 1)].map(_ => Array(n + 1).fill(0));
    // dp[i][j] = size of largest subset where m = i, n = j
    for (let s of strs) {
        let [zs, os] = countChars(s);
        for (let i = m; i >= zs; i--) {
            for (let j = n; j >= os; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zs][j - os] + 1)
            }
        }
    }
    return dp[m][n]
}

const tests = [
    // { strs: ["10"], m: 5, n: 3, out: 1 },
    { strs: ["10", "0001", "111001", "1", "0"], m: 5, n: 3, out: 4 },
    { strs: ["111", "10", "0001", "111001", "1", "0"], m: 5, n: 3, out: 4 },
    { strs: ["10", "0", "1"], m: 1, n: 1, out: 2 }
];

tests.forEach((t, i) => console.log(
    'test', i, findMaxForm(t.strs, t.m, t.n) === t.out
))