// https://leetcode.com/problems/find-the-shortest-superstring/discuss/194932/Travelling-Salesman-Problem
const findExtra = (a, b) => {
    for (let i = 1; i < a.length; i++) {
        if (b.startsWith(a.slice(i))) {return b.length - a.length + i}
    }
    return b.length
}

var shortestSuperstring = function(words) {
    let n = words.length;
    let graph = Array(n);
    for (let i = 0; i < n; i++) {graph[i] = Array(n).fill(0)}
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // if (i === j) {continue}
            graph[i][j] = findExtra(words[i], words[j])
            graph[j][i] = findExtra(words[j], words[i])
        }
    }
    // console.log(graph)
    let dp = [...Array(1<<n).keys()].map(x => Array(n))
    let path = [...Array(1<<n).keys()].map(x => Array(n))
    let last = -1, min = Infinity;
    for (let i = 1; i < 1<<n; i++) {
        dp[i] = Array(n).fill(Infinity)
        for (let j = 0; j < n; j++) {
            // console.log('i, j, 1<<j, 1 & 1<<j', i, j, 1<<j, i&(1<<j))
            if ((i & (1<<j)) > 0) {
                let prev = i - (1<<j);
                if (prev === 0) {
                    dp[i][j] = words[j].length
                } else {
                    for (let k = 0; k<n; k++) {
                        // if (dp[prev] === undefined) {console.log('prev prob', i, j, prev)}
                        if (dp[prev][k] < Infinity && dp[prev][k] + graph[k][j] < dp[i][j]) {
                            dp[i][j] = dp[prev][k] + graph[k][j]
                            // console.log('set dp', i, j, 'to', dp[i][j])
                            path[i][j] = k
                        }
                    }
                }
            }
            // if (i === (1<<n) - 1) {console.log('dp[last]', dp[i])}
            if (i === (1<<n) - 1 && dp[i][j] < min ) {
                min = dp[i][j]
                last = j
            }
        }
        // console.log('line', i, dp[i])
    }
    let cur = (1<<n) - 1
    let stack = []
    // console.log('min =', min)
    while (cur > 0) {
        // console.log(last, cur)
        stack.push(last);
        let temp = cur;
        cur -= (1<<last)
        last = path[temp][last]
    }
    // console.log(stack, last)
    let i = stack.pop()
    let out = words[i]
    while (stack.length > 0) {
        let j = stack.pop();
        out = out + words[j].slice(words[j].length - graph[i][j])
        i = j
    }
    return out
};