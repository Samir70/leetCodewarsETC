/**
 * Can you get from top to bottom of grid passing only through values 0
 * @param {*} grid 
 * @returns 
 */
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
        [1, 0], [0, -1], [0, 1]
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

const tests = [
  { args: [[[0, 1, 0], [1, 0, 0], [0, 0, 1]]], out: true },
  { args: [[[0, 1, 0], [1, 1, 0], [0, 0, 1]]], out: false },
];

tests.forEach((t, i) => {
  let res = bfs(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});