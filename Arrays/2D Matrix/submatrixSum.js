const numSubmatrixSumTarget = (matrix, target) => {
    let rows = matrix.length, cols = matrix[0].length;
    let sums = [];
    for (let r = 0; r < rows; r++) {
        sums.push([matrix[r][0]])
        for (let c = 1; c < cols; c++) {
            sums[r].push(sums[r][c - 1] + matrix[r][c])
        }
    }
    // console.table(matrix);
    // console.table(sums);
    let out = 0;
    for (let c1 = 0; c1 < cols; c1++) {
        for (let c2 = c1; c2 < cols; c2++) {
            let sum = 0, tally = {0:1}
            for (let r = 0; r < rows; r++) {
                sum += sums[r][c2] - (c1 ? sums[r][c1 - 1] : 0);
                if (tally[sum - target] !== undefined) {
                    out += tally[sum - target]
                }
                tally[sum] = (tally[sum] || 0) + 1
            }
        }
    }
    return out
}

const tests = [
    { matrix: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], target: 0, out: 4 },
    { matrix: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], target: 3, out: 6 },
    { matrix: [[1, -1], [-1, 1]], target: 0, out: 5 },
    { matrix: [[904]], target: 0, out: 0 }
];

tests.forEach((t, i) => console.log(
    'test', i, numSubmatrixSumTarget(t.matrix, t.target) === t.out
))