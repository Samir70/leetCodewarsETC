// change number of rows/cols of matrix, but keep row order traversal
// https://leetcode.com/problems/reshape-the-matrix/
// 84ms beats 98%
var matrixReshape = function(mat, r, c) {
    let rows = mat.length, cols = mat[0].length;
    if (r*c !== rows*cols) {return mat}
    let max = rows*cols
    let out = Array(r)
    for (let i = 0; i < r; i++) {out[i] = Array(c)}
    for (let i = 0; i < max; i++) {
        // console.log([i, max])
        let x = i % cols, y = Math.floor(i/cols)
        let newX = i%c, newY = Math.floor(i/c)
        // console.log([x, y], [newX, newY])
        out[newY][newX] = mat[y][x]
    }
    return out
};
