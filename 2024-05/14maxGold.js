/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function (grid) {
  let [rows, cols] = [grid.length, grid[0].length]
  const getGold = (r, c, soFar, visited) => {
    let next = [
      [0, -1], [0, 1], [-1, 0], [1, 0]
    ].map(d => [d[0] + r, d[1] + c])
    let maxGold = soFar
    for (let [v, h] of next) {
      if (v < 0 || h < 0 || v >= rows || h >= cols ||
        visited.has([v, h].join(",")) || grid[v][h] === 0) { continue }
      visited.add([v, h].join(","))
      maxGold = Math.max(maxGold, getGold(v, h, soFar + grid[v][h], visited))
      visited.delete([v, h].join(","))
    }
    // console.log({ r, c, soFar, maxGold })
    return maxGold
  }
  let max = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let gold = grid[r][c]
      if (gold === 0) { continue }
      let visited = new Set()
      visited.add([r, c].join(","))
      max = Math.max(max, getGold(r, c, gold, visited))
      // console.log({ r, c, max, g: grid.map(r => r.join(",")) })
    }
  }
  return max
};

const tests = [
  { args: [[[0, 6, 0], [5, 8, 7], [0, 9, 0]]], out: 24 },
  { args: [[[1, 0, 7], [2, 0, 6], [3, 4, 5], [0, 3, 0], [9, 0, 20]]], out: 28 },
];

tests.forEach((t, i) => {
  let res = getMaximumGold(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});