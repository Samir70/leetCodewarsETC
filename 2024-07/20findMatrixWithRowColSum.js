// this can be simplified:
// set grid[r][c] to min, then subtract from the sums what was set
// 330ms, above knocks it down to 320ms
var restoreMatrix = function (rowSum, colSum) {
    let rows = rowSum.length, cols = colSum.length;
    let rs = [...rowSum], cs = [...colSum]
    let grid = Array(rows).fill(0).map(x => Array(cols).fill(0));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (rs[r] <= cs[c]) {
                grid[r][c] = rs[r];
                cs[c] -= rs[r];
                rs[r] = 0;
            } else {
                grid[r][c] = cs[c];
                rs[r] -= cs[c]
                cs[c] = 0
            }
        }
    }
    return grid
};

const tests = [
    { rowSum: [3, 8], colSum: [4, 7] },
    { rowSum: [5, 7, 10], colSum: [8, 6, 8] },
    { rowSum: [14, 9], colSum: [6, 9, 8] },
    { rowSum: [1, 0], colSum: [1] },
    { rowSum: [0], colSum: [0] }
];

tests.forEach((t, i) => {
    let out = restoreMatrix(t.rowSum, t.colSum);
    console.log(t.rowSum, t.colSum);
    console.log(out)
})