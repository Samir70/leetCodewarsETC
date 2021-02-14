const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]
const shortestPathBinaryMatrix = grid => {
    if (grid.length === 1) { return 1 }
    let n = grid.length - 1, target = [n, n].join(',');
    if (grid[0][0] === 1 || grid[n][n] === 1) { return -1 }
    let shortest = Infinity;
    let dp = Array(n);
    for (let r = 0; r <= n; r++) { dp[r] = Array(n+1).fill(Infinity) }
    dp[n][n] = 1;
    let stack = [[n, n]], seen = new Set();
    seen.add([n, n].join(','));
    while (stack.length) {
        let cur = stack.shift();
        for (let [r, c] of dirs) {
            r += cur[0]; c += cur[1];
            if (r < 0 || r > n || c < 0 || c > n || grid[r][c] === 1) { continue }
            // console.log('from', cur, 'checking', r, c, 'pathlength', dp[r][c], dp[cur[0]][cur[1]] + 1)
            dp[r][c] = Math.min(dp[r][c], dp[cur[0]][cur[1]] + 1);
            if (!seen.has([r, c].join(','))) {
                stack.push([r, c]);
                seen.add([r, c].join(','))
            }
        }
        // for (let r = 0; r <= n; r++) { console.log(dp[r]) }
        // console.log('statck', stack, seen)
    }

    return dp[0][0] === Infinity ? -1 : dp[0][0]
}


const test1 = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]; //4
const test2 = [[1, 0, 0], [1, 1, 0], [1, 1, 0]]; // -1
const test3 = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0]
]; // 7
const test4 = [
    [0, 0, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0]
]; // return early gives 8 but 7 is best
// do full search, get TLE
console.log(shortestPathBinaryMatrix(test3))