// fastest with 84ms, but not manysubmissions
const diagonalSum = m => {
    let left = 0, right = m.length-1, row = 0;
    let sum = 0;
    while (row < m.length) {
        sum += m[row][left] + m[row][right];
        row++; left++; right--
    }
    if (row % 2 === 1) {
        let mid = (row-1)/2;
        sum -= m[mid][mid]
    }
    return sum
}

const tests = [
    { in: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], out: 25 },
    { in: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], out: 8 },
    { in: [[5]], out: 5 }
];

tests.forEach((t, i) => console.log(
    'test', i, diagonalSum(t.in) === t.out
))