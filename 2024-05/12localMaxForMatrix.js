/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var largestLocal = function (grid) {
  let = out = []
  let [rows, cols] = [grid.length, grid[0].length]
  for (let r = 1; r < rows - 1; r++) {
    let outRow = []
    for (let c = 1; c < cols - 1; c++) {
      let max = 0
      for (let i = r - 1; i <= r+1; i++) {
        for (let j = c - 1; j <= c+1; j++) {
          max = Math.max(max, grid[i][j])
        }
      }
      outRow.push(max)
    }
    out.push(outRow)
  }
  return out
};

const tests = [
  { args: [[[9, 9, 8, 1], [5, 6, 2, 6], [8, 2, 6, 4], [6, 2, 2, 2]]], out: [[9, 9], [8, 6]] },
  { args: [[[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 2, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]], out: [[[2, 2, 2], [2, 2, 2], [2, 2, 2]]] },
];

tests.forEach((t, i) => {
  let res = largestLocal(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});