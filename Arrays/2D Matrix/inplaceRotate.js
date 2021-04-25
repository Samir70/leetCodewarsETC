// (98%, 95%)
const rotate = matrix => {
    let rows = matrix.length - 1;
    if (rows === 0) {return matrix}
    for (let r = 0; r <= rows/2; r++) {
        for (let c = r; c <= rows - r - 1; c++) {
            let temp = matrix[r][c]
            matrix[r][c] = matrix[rows - c][r]
            matrix[rows - c][r] = matrix[rows - r][rows - c]
            matrix[rows - r][rows - c] = matrix[c][rows - r]
            matrix[c][rows - r] = temp
            // console.log([r, c], [rows - c, r], [rows - r, rows - c], [c, rows - r])
        } 
        // console.log(matrix)
    }
}