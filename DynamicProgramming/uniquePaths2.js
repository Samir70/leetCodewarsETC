// https://leetcode.com/problems/unique-paths-ii/
var uniquePathsWithObstacles = function(grid) {
    let rows = grid.length, cols = grid[0].length;
    let ways = Array(rows);
    for (let r = rows - 1; r >=0 ; r--) {
        ways[r] = Array(cols).fill(0)
        for (let c = cols - 1; c >= 0; c--) {
            if (grid[r][c]) {ways[r][c] = 0; continue}
            if (r === rows - 1 && c === cols - 1) {ways[r][c] = 1; continue}
            let waysDown = ways[r+1] === undefined ? 0 : ways[r+1][c]
            let waysRight = ways[r][c+1] || 0
            ways[r][c] = waysDown + waysRight
        }
    }
    return ways[0][0]
};