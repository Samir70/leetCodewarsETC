// 856ms 
// https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/
const cumulSum = arr => {
    for (let i = 1; i < arr.length; i++) {
        arr[i] = arr[i] + arr[i-1]
    }
    return arr
}
const sumRect = (m, topR, topC, botR, botC) => {
    let sum = 0
    sum += m[botR][botC]
    sum -= topR === 0 ? 0 : m[topR-1][botC]
    sum -= topC === 0 ? 0 : m[botR][topC - 1]
    sum += topR === 0 || topC === 0 ? 0 : m[topR - 1][topC - 1]
    // console.log('sumrect', topR, topC, botR, botC, sum)
    return sum
}
var maxSumSubmatrix = function(matrix, k) {
    matrix = matrix.map(cumulSum)
    // console.log(matrix)
    let rows = matrix.length, cols = matrix[0].length;
    for (let r = 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            matrix[r][c] += matrix[r-1][c]
        }
    }
    // console.log(matrix)
    let maxSum = -Infinity;
    for (let tr = 0; tr < rows; tr++) {
        for (let tc = 0; tc < cols; tc++) {
            for (let br = tr; br < rows; br++) {
                for (let bc = tc; bc < cols; bc++) {
                    let sum = sumRect(matrix, tr, tc, br, bc)
                    if (sum <= k && maxSum <  sum) {maxSum = sum}
                }
            }
        }
    }
    return maxSum
};