/**
 * Get from top left to bottom right in a grid
 * travel LRUD, with cost = diff in value of the grid.
 * find the path with min effort, where effort is the max cost along path
 */

const cost = (grid, a, b) => Math.abs(grid[a[0]][a[1]] - grid[b[0]][b[1]]);
const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1]
]

const minimumEffortPath = heights => {
    let rows = heights.length, cols = heights[0].length;
    let costs = Array(rows)
    for (let r = 0; r < rows; r++) {
        costs[r] = Array(cols).fill(-Infinity)
    }
    costs[0][0] = 0
    let toMoveFrom = [[0, 0]]
    while (toMoveFrom.length) {
        let cur = toMoveFrom.pop();
        let next = dirs.map(x => [x[0] + cur[0], x[1] + cur[1]]);
        for (let [r, c] of next) {
            if (r < 0 || r >= rows || c < 0 || c >= cols) { continue }
            costs[r][c] = Math.max(cost[r][c], cost(heights, cur, [r, c]))
            toMoveFrom.push([r, c])
        }
    }
    return cost[rows - 1][cols - 1]
}

const tests = [
    { heights =[[1, 2, 2], [3, 8, 2], [5, 3, 5]], Output: 2 },
    { heights =[[1, 2, 3], [3, 8, 4], [5, 3, 5]], Output: 1 },
    { heights =[[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]], Output: 0 }
]