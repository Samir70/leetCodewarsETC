const bfs = (grid) => {
  let rows = grid.length, cols = grid[0].length;
  let stack = []
  for (let c = 0; c < cols; c++) {
    if (grid[0][c] === 0) { stack.push([0, c]) }
  }
  let visited = new Set(stack.map(cell => cell.join(",")))
  while (stack.length > 0) {
    // console.log(grid, stack, visited)
    let newStack = []
    while (stack.length > 0) {
      let cur = stack.pop()
      if (cur[0] === rows - 1) { return true }
      let nextSteps = [
        [1, 0], [-1, 0], [0, -1], [0, 1]
      ].map(d => [d[0] + cur[0], d[1] + cur[1]])
      // console.log({nextSteps})
      for (let [r, c] of nextSteps) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || visited.has([r, c].join(","))) {
          continue
        }
        if (grid[r][c] === 1) { continue }
        visited.add([r, c].join(","))
        newStack.push([r, c])
      }
    }
    // console.log({newStack})
    stack = [...newStack]
  }
  return false
}

/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
var latestDayToCross = function (rows, cols, cells) {
  let grid = Array(rows);
  const setUpGrid = () => {
    for (let r = 0; r < rows; r++) {
      grid[r] = Array(cols).fill(0)
    }
  }
  setUpGrid()
  let left = 0, right = cells.length;
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    setUpGrid()
    for (let cell = 0; cell <= mid; cell++) {
      let [r, c] = cells[cell]
      grid[r - 1][c - 1] = 1
    }
    let canCross = bfs(grid)
    // console.log({ left, right, mid, grid: grid.map(r => r.join("")).join("\n"), canCross })
    if (canCross) {
      left = mid + 1
    } else {
      right = mid;
    }
  }
  return left
};

const tests = [
  { args: [2, 2, [[1, 1], [2, 1], [1, 2], [2, 2]],], out: 2 },
  { args: [2, 2, [[1, 1], [1, 2], [2, 1], [2, 2]],], out: 1 },
  { args: [3, 3, [[1, 2], [2, 1], [3, 3], [2, 2], [1, 1], [1, 3], [2, 3], [3, 2], [3, 1]],], out: 3 },
  { args: [5, 2, [[5, 1], [1, 2], [3, 1], [2, 2], [3, 2], [1, 1], [5, 2], [2, 1], [4, 2], [4, 1]]], out: 3 },
  { args: [13, 9, [[12, 6], [3, 4], [2, 9], [9, 4], [9, 2], [6, 4], [4, 4], [8, 6], [4, 9], [5, 6], [7, 5], [12, 4], [11, 8], [3, 7], [2, 6], [9, 8], [3, 5], [13, 4], [1, 3], [10, 2], [8, 9], [6, 6], [11, 7], [11, 1], [13, 9], [12, 7], [10, 7], [8, 2], [1, 8], [7, 3], [6, 5], [2, 1], [10, 6], [4, 8], [4, 2], [9, 7], [6, 2], [3, 6], [12, 2], [10, 3], [10, 5], [9, 5], [8, 8], [8, 7], [3, 2], [13, 6], [3, 1], [5, 1], [2, 7], [8, 3], [12, 5], [11, 2], [6, 3], [1, 4], [13, 3], [4, 1], [9, 9], [7, 7], [4, 3], [12, 1], [2, 2], [7, 6], [4, 6], [7, 9], [7, 2], [3, 8], [1, 6], [11, 3], [11, 4], [5, 9], [13, 8], [1, 9], [10, 1], [9, 1], [6, 1], [10, 9], [12, 9], [11, 5], [8, 1], [13, 5], [9, 6], [13, 2], [6, 8], [2, 8], [5, 3], [3, 3], [13, 1], [11, 9], [9, 3], [2, 4], [5, 2], [8, 5], [13, 7], [12, 8], [5, 5], [7, 1], [7, 4], [2, 5], [6, 9], [4, 7], [5, 8], [1, 5], [10, 8], [8, 4], [1, 1], [3, 9], [1, 2], [7, 8], [1, 7], [6, 7], [11, 6], [4, 5], [5, 7], [2, 3], [10, 4], [5, 4], [12, 3]]], out: 35 }
];

tests.forEach((t, i) => {
  // if (i !== 4) { return }
  let res = latestDayToCross(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});