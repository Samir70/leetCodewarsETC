/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var luckyNumbers = function (matrix) {
  let rows = matrix.length, cols = matrix[0].length
  let colMax = Array(cols).fill(0)
  let rowMin = Array(rows).fill(Infinity)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rowMin[r] = Math.min(rowMin[r], matrix[r][c])
      colMax[c] = Math.max(colMax[c], matrix[r][c])
    }
  }
  // console.log({ rowMin, colMax })
  let out = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c] === rowMin[r] && matrix[r][c] === colMax[c]) {
        out.push(matrix[r][c])
      }
    }
  }
  return out
};

const tests = [
  { args: [[[3, 7, 8], [9, 11, 13], [15, 16, 17]]], out: [15] },
  { args: [[[1, 10, 4, 2], [9, 3, 8, 7], [15, 16, 17, 12]]], out: [12] },
  { args: [[[7, 8], [1, 2]]], out: [7] },
];

tests.forEach((t, i) => {
  let res = luckyNumbers(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});