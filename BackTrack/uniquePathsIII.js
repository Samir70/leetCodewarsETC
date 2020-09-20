// 100ms; beats 42%
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
const uniquePathsIII = grid => {
    let paths = 0;
    let start = [], zeros = 0;
    let rows = grid.length, cols = grid[0].length;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 1) { start = [r, c] }
            if (grid[r][c] === 0) { zeros++ }
        }
    }
    // console.log('start:', start, 'zeros:', zeros)
    const wholePath = (r, c, zerosBagged) => {
        // console.log('at', r, c, 'grid:', grid);
        // console.log('zerosBagged', zerosBagged)
        if (grid[r][c] === 2 && zerosBagged === zeros) { paths++; return null}
        if (grid[r][c] === 2) { return null}
        let temp = grid[r][c];
        grid[r][c] = -5;
        let nextSteps = dirs.map(d => [d[0] + r, d[1] + c])
            .filter(x => x[0] >= 0 && x[0] < rows && x[1]>= 0 && x[1]<cols && grid[x[0]][x[1]] >= 0);
        // console.log('nextSteps', nextSteps)
        nextSteps.forEach(step => {
            if (grid[step[0]][step[1]] === 0) {
                wholePath(step[0], step[1], zerosBagged+1)
            } else if (grid[step[0]][step[1]] === 2) {
                wholePath(step[0], step[1], zerosBagged)
            }
        })
        grid[r][c] = temp
        return null
    }
    wholePath(start[0], start[1], 0);
    console.log(paths)
    return paths
}

const tests = [
    { in: [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]], out: 2 },
    { in: [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 2]], out: 4 },
    { in: [[-1, -1, 0, 0], [-1, -1, 0, 0], [1, 0, 0, 2]], out: 1 },
    { in: [[0, 1], [2, 0]], out: 0 }
];

tests.forEach((t, i) => console.log(
    'test', i, uniquePathsIII(t.in) === t.out
))