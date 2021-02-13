const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]
const shortestPathBinaryMatrix = grid => {
    if (grid.length === 1) { return 1 }
    let n = grid.length - 1, target = [n, n].join(',');
    if (grid[0][0] === 1 || grid[n][n] === 1) { return -1 }
    let stack = [{ last: [0, 0], used: ['0,0'] }];
    // console.log(target)
    let shortest = Infinity;
    while (stack.length) {
        let newStack = [];
        let cur = stack.pop();
        let next = dirs.map(d => [cur.last[0] + d[0], cur.last[1] + d[1]]);
        // console.log(cur, next)
        for (let [r, c] of next) {
            if (r < 0 || r > n || c < 0 || c > n || grid[r][c] === 1) { continue }
            // console.log(r, c, 'from', cur.last, grid[r][c], cur.used.length)
            if ([r, c].join(',') === target) {
                shortest = Math.min(shortest, cur.used.length + 1)
                // return shortest
            } else if (!cur.used.includes([r, c].join(','))) {
                newStack.push({ last: [r, c], used: [...cur.used, [r, c].join(',')] })
            }
        }
        // console.log('new stack:', newStack)
        stack = [...stack, ...newStack]
    }
    return shortest === Infinity ? -1 : shortest;
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