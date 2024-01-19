/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
  let rows = matrix.length, cols = matrix[0].length;
  for (let r = rows - 2; r >= 0; r--) {
    // console.log({ cur: matrix[r], next: matrix[r + 1] })
    for (let c = 0; c < cols; c++) {
      let left = matrix[r + 1][c - 1] === undefined ? Infinity : matrix[r + 1][c - 1]
      let below = matrix[r + 1][c] === undefined ? Infinity : matrix[r + 1][c]
      let right = matrix[r + 1][c + 1] === undefined ? Infinity : matrix[r + 1][c + 1]
      matrix[r][c] += Math.min(left, below, right)
      // console.log({ r, c, left, below, right })
    }
    // console.log(matrix[r])
  }
  return Math.min(...matrix[0])
};

const tests = [
  { args: [[[2, 1, 3], [6, 5, 4], [7, 8, 9]]], out: 13 },
  { args: [[[-19, 57], [-40, -5]]], out: -59 },
  { args: [[[100, -42, -46, -41], [31, 97, 10, -10], [-58, -51, 82, 89], [51, 81, 69, -51]]], out: -36 }
];

tests.forEach((t, i) => {
  let res = minFallingPathSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});