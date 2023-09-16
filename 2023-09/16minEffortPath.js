const cost = (grid, a, b) => Math.abs(grid[a[0]][a[1]] - grid[b[0]][b[1]]);
const dirs = [
  [1, 0], [-1, 0], [0, 1], [0, -1]
]
const stringify = arr => arr.join(",")
/**
 * @param {number[][]} heights
 * @return {number}
 */
// 7149ms one of the slowest ever!!!!!!!!!!
var minimumEffortPath = function (heights) {
  let rows = heights.length, cols = heights[0].length;
  let minEffort = []
  for (let r = 0; r < rows; r++) {
    minEffort.push(Array(cols).fill(Infinity))
  }
  minEffort[0][0] = 0
  let toMoveFrom = [[0, 0]]
  while (toMoveFrom.length) {
    let [a, b] = toMoveFrom.pop();
    let next = dirs.map(x => [x[0] + a, x[1] + b]);
    for (let [r, c] of next) {
      if (r < 0 || r >= rows || c < 0 || c >= cols) { continue }
      let newEffort = Math.max(minEffort[a][b], cost(heights, [a, b], [r, c]))
      if (newEffort < minEffort[r][c]) {
        minEffort[r][c] = newEffort
        toMoveFrom.push([r, c])
      }
    }
  }
  return minEffort[rows - 1][cols - 1]
};

const tests = [
  { args: [[[1, 2, 2], [3, 8, 2], [5, 3, 5]]], out: 2 },
  { args: [[[3]]], out: 0 },
  { args: [[[1, 10, 6, 7, 9, 10, 4, 9]]], out: 9 },
  { args: [[[1, 2, 3], [3, 8, 4], [5, 3, 5]]], out: 1 },
  { args: [[[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]], out: 0 },
  { args: [[[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]], out: 0 },
  { args: [[[4, 3, 4, 10, 5, 5, 9, 2], [10, 8, 2, 10, 9, 7, 5, 6], [5, 8, 10, 10, 10, 7, 4, 2], [5, 1, 3, 1, 1, 3, 1, 9], [6, 4, 10, 6, 10, 9, 4, 6]]], out: 5 },
];

tests.forEach((t, i) => {
  // if (i !== 2) { return }
  let res = minimumEffortPath(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});