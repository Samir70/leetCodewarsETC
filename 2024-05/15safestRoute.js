/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function (grid) {
  const rows = grid.length;
  if (grid[0][0] === 1 || grid[rows - 1][rows - 1] === 1) { return 0 }
  let dist2thief = []
  for (let r = 0; r < rows; r++) { dist2thief.push(Array(rows).fill(Infinity)) }
  let stack = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < rows; c++) {
      if (grid[r][c] === 1) {
        dist2thief[r][c] = 0
        stack.push([r, c])
      }
    }
  }
  let maxDist = 0
  while (stack.length) {
    let newStack = []
    while (stack.length) {
      let [r, c] = stack.pop()
      let d = dist2thief[r][c]
      let next = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
      ].map(d => [d[0] + r, d[1] + c])
      for (let [i, j] of next) {
        if (i < 0 || i >= rows || j < 0 || j >= rows) { continue }
        if (dist2thief[i][j] !== Infinity) { continue }
        dist2thief[i][j] = d + 1
        maxDist = Math.max(maxDist, d + 1)
        newStack.push([i, j])
      }
    }
    stack = [...newStack]
  }
  console.log(dist2thief)

  const canGetThere = minDist => {
    if (dist2thief[0][0] < minDist) { return false }
    let stack = [[0, 0]], visited = new Set()
    while (stack.length) {
      // console.log({ stack, minDist })
      let [r, c] = stack.pop()
      visited.add([r, c].join(","))
      if (r === rows - 1 && c === rows - 1) { return true }
      let next = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
      ].map(d => [d[0] + r, d[1] + c])
      for (let [i, j] of next) {
        if (i < 0 || i >= rows || j < 0 || j >= rows) { continue }
        if (dist2thief[i][j] < minDist) { continue }
        if (visited.has([i, j].join(","))) { continue }
        stack.push([i, j])
      }
    }
    return false
  }

  let [left, right] = [0, maxDist]
  while (left < right) {
    let mid = Math.ceil((left + right) / 2)
    // console.log({ left, mid, right, verdict: canGetThere(mid) })
    if (!canGetThere(mid)) {
      right = mid - 1
    } else {
      left = mid
    }
  }
  return left
};

const tests = [
  { args: [[[1, 0, 0], [0, 0, 0], [0, 0, 1]]], out: 0 },
  { args: [[[0, 0, 1], [0, 0, 0], [0, 0, 0]]], out: 2 },
  { args: [[[0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]]], out: 2 },
  /**
   * [ 
   * [ 3, 2, 1, 0 ], 
   * [ 2, 3, 2, 1 ], 
   * [ 1, 2, 3, 2 ], 
   * [ 0, 1, 2, 3 ] ]
   */
]

tests.forEach((t, i) => {
  let res = maximumSafenessFactor(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});