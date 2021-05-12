// https://leetcode.com/problems/range-sum-query-2d-immutable/
// beats 82%
const cumulSum = arr => {
    let out = [], sum = 0
    for (let a of arr) {
        sum += a;
        out.push(sum)
    }
    return out
}

var NumMatrix = function(matrix) {
    // let rows = matrix.length, cols = matrix[0].length;
    this.grid = matrix.map(cumulSum)
};

NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    let sum = 0;
    for (let r = row1; r <= row2; r++) {
        sum += this.grid[r][col2] - (this.grid[r][col1 - 1] || 0)
    }
    return sum
};

/** 
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */

/**
 * sgallivan
 * class NumMatrix {
    constructor(M) {
        let ylen = M.length + 1, xlen = M[0].length + 1
        this.dp = Array.from({length: ylen}, () => new Array(xlen).fill(0))
        for (let i = 1; i < ylen; i++)
            for (let j = 1; j < xlen; j++)
                this.dp[i][j] = M[i-1][j-1] + this.dp[i-1][j] + this.dp[i][j-1] - this.dp[i-1][j-1]
    }
    
    sumRegion(R1, C1, R2, C2) {
        return this.dp[R2+1][C2+1] - this.dp[R2+1][C1] - this.dp[R1][C2+1] + this.dp[R1][C1]
    }
};
 */