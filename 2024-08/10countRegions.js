/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function (grid) {
  let [rows, cols] = [grid.length, grid[0].length]
  let expandedGrid = []
  for (let r = 0; r < rows; r++) {
    expandedGrid.push(Array(cols * 3).fill(0))
    expandedGrid.push(Array(cols * 3).fill(0))
    expandedGrid.push(Array(cols * 3).fill(0))
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let [i, j] = [3 * r, 3 * c]
      if (grid[r][c] === "\\") {
        expandedGrid[i][j] = 1
        expandedGrid[i + 1][j + 1] = 1
        expandedGrid[i + 2][j + 2] = 1
      }
      if (grid[r][c] === "/") {
        expandedGrid[i][j + 2] = 1
        expandedGrid[i + 1][j + 1] = 1
        expandedGrid[i + 2][j] = 1
      }
    }
  }
  // console.log(expandedGrid)
  let regionsCount = 0
  let dirs = [
    [0, -1], [0, 1], [-1, 0], [1, 0]
  ]
  rows *= 3; cols *= 3;
  const floodFill = (row, col) => {
    regionsCount++
    let stack = [[row, col]]
    while (stack.length > 0) {
      let [r, c] = stack.pop()
      if (r < 0 || r >= rows || c < 0 || c >= cols) { continue }
      if (expandedGrid[r][c] === 0) {
        expandedGrid[r][c] = 1
        for (d of dirs) {
          stack.push([d[0] + r, d[1] + c])
        }
      }
    }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < rows; c++) {
      if (expandedGrid[r][c] === 0) {floodFill(r, c)}
    }
  }
  return regionsCount
};

// for (let c of "///\\//\\") {
//   console.log(c)
// }
// console.log("\\".length)

const tests = [
  { args: [[" /", "/ "]], out: 2 },
  { args: [[" /", "  "]], out: 1 },
  { args: [["/\\", "\\/"]], out: 5 },
];

tests.forEach((t, i) => {
  let res = regionsBySlashes(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});