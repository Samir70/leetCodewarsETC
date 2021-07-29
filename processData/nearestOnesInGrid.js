// 144ms beats 98%
// https://leetcode.com/problems/01-matrix/
var updateMatrix = function (mat) {
    let rows = mat.length, cols = mat[0].length;
    let downRight = Array(rows);
    let upLeft = Array(rows);
    for (let r = 0; r < rows; r++) {
        downRight[r] = Array(cols).fill(0)
        upLeft[r] = Array(cols).fill(0)
    }
    downRight[0][0] = mat[0][0] === 0 ? 0 : Infinity;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r === 0 && c === 0) {continue}
            if (mat[r][c] === 0) {downRight[r][c] === 0; continue}
            let above = r === 0 ? Infinity : downRight[r-1][c]
            let left = c === 0 ? Infinity : downRight[r][c-1]
            downRight[r][c] = Math.min(above+1, left+1)
        }
    }
    console.log(downRight);
    upLeft[rows - 1][cols - 1] = mat[rows - 1][cols-1] === 0 ? 0 : Infinity
    for (let r = rows - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 0; c--) {
            let below = r === rows - 1 ? Infinity : upLeft[r+1][c]
            let right = c === cols - 1 ? Infinity : upLeft[r][c+1]
            upLeft[r][c] = Math.min(downRight[r][c], below+1, right+1)
        }
    }
    return upLeft
};

const tests = [
    { m: [[0, 0, 0], [0, 1, 0], [0, 0, 0]], out: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] },
    { m: [[0, 0, 0], [0, 1, 0], [1, 1, 1]], out: [[0, 0, 0], [0, 1, 0], [1, 2, 1]] },
    { m: [[1, 0, 1], [1, 1, 1], [1, 1, 1]], out: [[1, 0, 1], [2, 1, 2], [3, 2, 3]] }
]

tests.forEach((t, i) => console.log(
    'test', i, updateMatrix(t.m)
))