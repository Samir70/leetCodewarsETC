/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFallingPathSum = function (grid) {
  let rows = grid.length, cols = grid[0].length;
  for (let r = rows - 2; r >= 0; r--) {
    // console.log({ cur: grid[r], next: grid[r + 1] })
    for (let c = 0; c < cols; c++) {
      let belowVal = grid[r+1][c]
      grid[r+1][c] = Infinity
      grid[r][c] += Math.min(...grid[r+1])
      grid[r+1][c] = belowVal
    }
    // console.log(grid[r])
  }
  return Math.min(...grid[0])
};

const tests = [
  { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], out: 13 },
  { args: [[[1, 2, 3], [4, 5, 2], [7, 8, 9]]], out: 10 },
  { args: [[[7]]], out: 7 },
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