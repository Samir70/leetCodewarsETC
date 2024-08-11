/**
 * @param {number[][]} grid
 * @return {number}
*/
const dirs = [
  [0, -1], [0, 1], [-1, 0], [1, 0]
]
const islandsCount = (g) => {
  let count = 0
  const grid = []
  for (let r of g) {
    grid.push([...r])
  }
  let [rows, cols] = [grid.length, grid[0].length]
  const floodFill = (row, col) => {
    count++
    let stack = [[row, col]]
    while (stack.length > 0) {
      let [r, c] = stack.pop()
      if (r < 0 || r >= rows || c < 0 || c >= cols) { continue }
      if (grid[r][c] === 1) {
        grid[r][c] = 2
        for (d of dirs) {
          stack.push([d[0] + r, d[1] + c])
        }
      }
    }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        floodFill(r, c)
      }
    }
  }
  return count
}
var minDays = function (grid) {
  let numIslands = islandsCount(grid)
  if (numIslands !== 1) { return 0 }
  let [rows, cols] = [grid.length, grid[0].length]
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        grid[r][c] = 0
        numIslands = islandsCount(grid)
        if (numIslands !== 1) { return 1 }
        grid[r][c] = 1
      }
    }
  }
  return 2
};

const tests = [
  { args: [[[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]], out: 2 },
  { args: [[[1, 1]]], out: 2 },
  { args: [[[0, 0]]], out: 0 },
  { args: [[[0, 1, 0, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 0]]], out: 1 },
  { args: [[[1, 1, 0, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1]]], out: 1 },
  { args: [[[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]], out: 2 },
  { args: [[[1, 1, 0], [1, 1, 1], [0, 1, 0]]], out: 1 },
  { args: [[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]], out: 2 },
  { args: [[[1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1], [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0], [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0], [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1]]], out: 0 },
  { args: [[[1, 0], [0, 1]]], out: 0 },
  { args: [[[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]], out: 1 },
  { args: [[[1, 1, 0, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 1], [1, 1, 1, 1, 1]]], out: 2 },
  { args: [[[1, 1, 1, 0]]], out: 1 },
];

const printGrid = g => {
  for (let r of g) { console.log(r.join("")) }
}
tests.forEach((t, i) => {
  // if (i !== 3) { return }
  let res = minDays(...t.args);
  if (res !== t.out) {
    printGrid(t.args[0])
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});