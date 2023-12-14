/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var onesMinusZeros = function (grid) {
  out = []
  const rows = grid.length, cols = grid[0].length
  onesRow = []
  onesCol = Array(cols).fill(0)
  for (let r = 0; r < rows; r ++) {
    oneCount = 0
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        oneCount++
        onesCol[c]++
      } else {
        oneCount--
        onesCol[c]--
      }
    }
    onesRow.push(oneCount)
  }
  // console.log({onesRow, onesCol})
  for (let r = 0; r < rows; r ++) {
    out.push(onesCol.map(c => c + onesRow[r]))
  }

  return out
};

const tests = [
  { args: [[[0, 1, 1], [1, 0, 1], [0, 0, 1]]], out: [[0, 0, 4], [0, 0, 4], [-2, -2, 2]] },
  { args: [[[1, 1, 1], [1, 1, 1]]], out: [[5, 5, 5], [5, 5, 5]] },
];

tests.forEach((t, i) => {
  let res = onesMinusZeros(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});