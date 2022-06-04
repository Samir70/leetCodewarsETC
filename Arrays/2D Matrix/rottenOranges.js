const displayRow = r => r.map(c => c === Infinity ? 'I' : '' + c).map(c => c.length === 1 ? '.' + c + '.' : '.' + c).join('-')

/**
 * @param {number[][]} grid
 * @return {number}
 */
const rotten = 2
const fresh = 1
const empty = 0
const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
var orangesRotting = function (grid) {
    let rows = grid.length, cols = grid[0].length;
    let steps = Array(rows);
    for (let r = 0; r < rows; r++) {
        steps[r] = Array(cols).fill(Infinity)
    }
    const spreadFrom = (r, c, stepsSoFar, visited) => {
        let next = dirs.map(d => [d[0] + r, d[1] + c])
        for (let [i, j] of next) {
            if (i < 0 || j < 0 || i === rows || j === cols || grid[i][j] !== 1 || visited.has([i, j].join(','))) { continue }
            steps[i][j] = Math.min(stepsSoFar + 1, steps[i][j])
            // console.log({ handled: [i, j], from:[r, c], dist: steps[i][j], visited })
            visited.add([i, j].join(','))
            spreadFrom(i, j, stepsSoFar + 1, visited)
            visited.delete([i, j].join(','))
        }
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === empty) { continue }
            if (grid[r][c] === rotten) {
                steps[r][c] = 0;
                let visited = new Set()
                spreadFrom(r, c, 0, visited)
            }
        }
    }
    let max = 0
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === empty || grid[r][c] === rotten) { continue }
            max = Math.max(max, steps[r][c])
        }
    }
    // console.log(grid.map(displayRow))
    // console.log(steps.map(displayRow))
    return max === Infinity ? -1 : max
};

const tests = [
    {
        grid: [
            [2, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], out: 58
    },
    { grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]], out: 4 },
    { grid: [[2, 1, 1], [0, 1, 1], [1, 0, 1]], out: -1 },
    { grid: [[0, 2]], out: 0 },
    { grid: [[2, 1, 1], [1, 1, 1], [0, 1, 2]], out: 2 }
]

tests.forEach((t, i) => console.log(
    'test', i, orangesRotting(t.grid) === t.out
))