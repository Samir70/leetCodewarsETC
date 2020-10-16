const searchMatrix2Binarys = (matrix, target) => {
    if (matrix.length === 0) { return false }
    let top = 0, bottom = matrix.length - 1;
    while (bottom - top > 1) {
        let mid = top + Math.floor((bottom - top) / 2);
        if (matrix[mid][0] > target) {
            bottom = mid - 1
        } else {
            top = mid
        }
    }
    let row = matrix[bottom][0] > target ? top : bottom;
    let left = 0, right = matrix[row].length - 1;
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (matrix[row][mid] >= target) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    console.log(row, bottom, top)
    return matrix[row][left] === target
}

const searchMatrix = (matrix, target) => {
    let rows = matrix.length;
    if (rows === 0) { return false }
    let cols = matrix[0].length;
    if (cols === 0) {return false}
    // total number of elements is rows*cols
    // can be numbered from zero to rows*cols - 1
    let left = 0, right = rows * cols - 1

    let locate = n => [Math.floor(n / cols), n % cols];

    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        let [r, c] = locate(mid);
        if (matrix[r][c] >= target) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    let [r, c] = locate(left);
    return matrix[r][c] === target
}


const tests = [
    { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]], target: 3, out: true },
    { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]], target: 13, out: false },
    { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]], target: 34, out: true },
    { matrix: [], target: 0, out: false },
    { matrix: [[1], [3]], target: 3, out: true },
    { matrix: [[]], target: 1, out: false }
];

tests.forEach((t, i) => console.log(
    'test', i, searchMatrix(t.matrix, t.target) === t.out
));