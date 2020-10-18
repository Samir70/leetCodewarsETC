/**
 * Given n points, 0..(n-1), how many ways can we split the line into k segments
 * segements should not overlap, but can start where another ends.
 * first method worked to find dp(n, k) via sums of i*dp(n-1, k-i)
 * But got TLE on (1000, 998) almost the largest possible input
 * 66/68 cases passed
 */

var numberOfSets_1 = function (n, k) {
    let dp = Array(k);
    for (let i = 0; i < n; i++) {
        dp[i] = Array(n).fill(0)
    }
    for (let i = 1; i < n; i++) {
        dp[1][i] = i + dp[1][i - 1]
    }

    let start = 2;
    let base = 10 ** 9 + 7;
    for (let r = 2; r <= k; r++) {
        for (let i = start; i < n; i++) {
            let ways = 0;
            for (let c = 1; c < i; c++) {
                ways = (ways + c * dp[r - 1][i - c]) % base;
            }
            dp[r][i] = ways
        }
        // console.log(dp)
        start++
    }
    return dp[k][n - 1]
};

/**
 * Another method is to work out
 * Choose(n+k-1, 2k);
 * We must make a choice of 2k endpoints (start and end for each segment)
 * Everytime we choose an end, it is available as choice for then next start 
 *  --- except the last time
 * So we have the original n points, plus another k-1 that were end points available as start points.
 */

// overflows for large numbers
const numberOfSets_2 = (n, k) => {
    // need Choose(n+k-1, 2k)
    // by symmetry of Pascal's triangle, we can choose the lower of two
    let picks = Math.min(2 * k, (n - k - 1)); //n+k-1 -2k = n-k-1
    let i = 0;
    let choices = 1;
    let top = n + k - 1, bottom = 1
    console.log('need to choose', picks, 'from', n+k-1)
    while (i < picks) {
        choices *= top;
        choices /= bottom;
        i++;
        top--; bottom++
    }
    return choices % (10**9 + 7)
}

const memo = {}
const numberOfSets = (n, k) => {
    // need Choose(n+k-1, 2k)
    // by symmetry of Pascal's triangle, we can choose the lower of two
    let picks = Math.min(2 * k, (n - k - 1)); //n+k-1 -2k = n-k-1
    console.log('need to choose', picks, 'from', n+k-1)
    
    const choose = (a, b) => {
        if (a === b) {return 1}
        if (b === a-1) {return a}
        if (b === 0) {return 1}
        if (b === 1) {return a}
        let key = [a, b].join(',');
        if (memo[key] !== undefined) {return memo[key]}
        // console.log('working out', a, b)
        let ans = (choose(a-1, b-1) + choose(a-1, b)) % (10**9 + 7);
        memo[key] = ans;
        // console.log(memo)
        return ans
    }

    return choose(n+k-1, picks)
}

const tests = [
    { n: 4, k: 2, out: 5 },
    { n: 3, k: 1, out: 3 },
    { n: 30, k: 7, out: 796297179 },
    { n: 5, k: 3, out: 7 },
    { n: 3, k: 2, out: 1 }
];

tests.forEach((t, i) => console.log(
    'test', i, numberOfSets(t.n, t.k) === t.out ? true : numberOfSets(t.n, t.k)
))