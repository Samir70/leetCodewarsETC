// matrix rows and columns are each sorted in ascending order
const binarySearch = (arr, t) => {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        let mid = Math.floor(left + (right - left)/2);
        if (arr[mid] < t) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return arr[left] === t
}

// 3000+ms
var searchMatrix1 = function (matrix, target) {
    for (let r = 0; r < matrix.length; r++) {
        if (binarySearch(matrix[r], target)) {return true}
        if (matrix[r][0] > target) {return false}
    }
    return false
};

//276ms beating 98%
const searchMatrix = (matrix, target) => {
    let rows = matrix.length, cols = matrix[0].length;
    let row = 0, col = cols - 1;
    while (row < rows && col >= 0) {
        if (matrix[row][col] === target) {return true}
        if (matrix[row][col] > target) {
            col--; // the rest of this column are all too big
        } else {
            row++; // the rest of this row is too small
        }
    }
    return false
}

const tests = [
    {
        matrix: [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]],
        target: 5,
        out: true
    },
    {
        matrix: [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]],
        target: 20,
        out: false
    }
]

tests.forEach((t, i) => console.log(
    'test', i, searchMatrix(t.matrix, t.target) === t.out
))