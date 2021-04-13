var longestIncreasingPath = function (matrix) {
    let max = 0;
    let rows = matrix.length, cols = matrix[0].length;
    let maxFrom = [];
    for (let i = 0; i < rows; i++) { maxFrom.push(Array(cols).fill(0)) }
    const pathLen = (r, c) => {
        if (maxFrom[r][c] > 0) { return maxFrom[r][c] }
        // console.log('finding pathLen from', r, c)
        let nextSteps = [
            [1, 0], [-1, 0], [0, -1], [0, 1]
        ].map(d => [d[0] + r, d[1] + c]);
        let localmax = 1;
        let outcome = 1;
        for (let [i, j] of nextSteps) {
            if (i < 0 || i >= rows || j < 0 || j >= cols) { continue }
            if (matrix[i][j] > matrix[r][c]) {
                outcome = 1 + pathLen(i, j)
                if (outcome > localmax) { localmax = outcome }
            }
        }
        maxFrom[r][c] = localmax
        return localmax
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let outcome = pathLen(r, c)
            if (outcome > max) { max = outcome }
        }
    }
    return max
};