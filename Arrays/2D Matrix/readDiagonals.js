// https://leetcode.com/problems/diagonal-traverse/submissions/
// first thought:
const findDiag = (matrix, row, col) => {
    // row, col are bottom right of a square overlay on top of matrix highlighting what to consider, 
    // they are possibly outside the matrix
    let out = []
    if (row % 2) {
        let [r, c] = [0, col]
        while (c >= 0) {
            if (r === matrix.length) {break}
            if (c < matrix[0].length) {
                out.push(matrix[r][c]);
            }
            c--; r++
        }
    } else {
        let [r, c] = [row, 0]
        while (r >= 0) {
            if (c === matrix[0].length) {break}
            if (r < matrix.length) {
                out.push(matrix[r][c])
            }
            c++; r--
        }
    }   
    return out
} 

const findDiagonalOrder = matrix => {
    if (matrix.length === 0) {return []}
    let out = [];
    let [r, c] = [0, 0];
    let limit = Math.max(matrix.length, matrix[0].length) * 2
    for (let corner = 0; corner < limit; corner++) {
        out = out.concat(findDiag(matrix, corner, corner))
    }
    return out
}

// then thought to jump to first that would be pushed
// But it was even slower going from about 850ms to 2000ms

const findDiag = (matrix, row, col) => {
    // row, col are bottom right of a square overlay on top of matrix highlighting what to consider, 
    // they are possibly outside the matrix
    let out = []
    if (row % 2) {
        let [r, c] = [0, col]
        while (c >= 0) {
            if (r >= matrix.length) {break}
            if (c < matrix[0].length) {
                out.push(matrix[r][c]);
            } else {
                let diff = c - matrix[0].length
                c -= diff; r += diff
            }
            c--; r++
        }
    } else {
        let [r, c] = [row, 0]
        while (r >= 0) {
            if (c >= matrix[0].length) {break}
            if (r < matrix.length) {
                out.push(matrix[r][c])
            } else {
                let diff = r - matrix.length
                r -= diff; c += diff
            }
            c++; r--
        }
    }   
    return out
} 

const findDiagonalOrder = matrix => {
    if (matrix.length === 0) {return []}
    let out = [];
    let [r, c] = [0, 0];
    let limit = Math.max(matrix.length, matrix[0].length) * 2
    for (let corner = 0; corner < limit; corner++) {
        out = out.concat(findDiag(matrix, corner, corner))
    }
    return out
}