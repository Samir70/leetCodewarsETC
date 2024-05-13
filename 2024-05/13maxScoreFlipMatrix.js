/**
 * @param {number[][]} grid
 * @return {number}
 */
var matrixScore = function (grid) {
  let rows = grid.length, cols = grid[0].length
  const flipRow = r => {
    for (let c = 0; c < cols; c++) {
      grid[r][c] ^= 1
    }
  }
  const flipCol = c => {
    for (let r = 0; r < rows; r++) {
      grid[r][c] ^= 1
    }
  }
  const count1sInCol = c => {
    let count = 0
    for (let r = 0; r < rows; r++) {
      count += grid[r][c]
    }
    return count
  }
  for (let r = 0; r < rows; r++) {
    if (grid[r][0] === 0) { flipRow(r) }
  }
  for (let c = 0; c < cols; c++) {
    let count = count1sInCol(c)
    if (count < rows / 2) { flipCol(c) }
    // console.log({ c, count })
  }
  // console.log(grid.map(r => r.join("")))
  return grid.map(r => "0b" + r.join("")).map(Number).reduce((a, c) => a + c)
};

const tests = [
  { args: [[[0, 0, 1, 1], [1, 0, 1, 0], [1, 1, 0, 0]]], out: 39 },
  { args: [[[0, 0, 1, 1], [0, 0, 1, 0], [0, 1, 0, 0]]], out: 38 },
  { args: [[[0, 0, 1, 1], [0, 0, 1, 0], [0, 1, 0, 0], [0, 1, 1, 1]]], out: 48 },
  { args: [[[0]]], out: 1 },
  { args: [[[0, 1], [0, 1], [0, 1], [0, 0]]], out: 11 },
];

tests.forEach((t, i) => {
  let res = matrixScore(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});