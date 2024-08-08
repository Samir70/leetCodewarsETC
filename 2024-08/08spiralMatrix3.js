/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
var spiralMatrixIII = function (rows, cols, rStart, cStart) {
  let out = [], cells = rows * cols
  let cur = [rStart, cStart], dir = 0
  let dirs = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ]
  const move = (loc, d) => [loc[0] + d[0], loc[1] + d[1]]
  const isInGrid = loc => 0 <= loc[0] && loc[0] < rows && 0 <= loc[1] && loc[1] < cols
  let [steps, spiralSize, firstLeg] = [0, 1, true]
  while (out.length < cells) {
    // console.log({ dir, spiralSize, firstLeg })
    while (out.length < cells && steps < spiralSize) {
      if (isInGrid(cur)) { out.push(cur) }
      cur = move(cur, dirs[dir])
      steps++
      // console.log({ cur, dir, d: dirs[dir] })
    }
    spiralSize += firstLeg ? 0 : 1
    firstLeg = !firstLeg
    steps = 0
    dir = (dir + 1) % 4
  }
  return out
};

const tests = [
  { args: [1, 1, 0, 0], out: [[0, 0]] },
  { args: [1, 4, 0, 0], out: [[0, 0], [0, 1], [0, 2], [0, 3]] },
  { args: [5, 6, 1, 4], out: [[1, 4], [1, 5], [2, 5], [2, 4], [2, 3], [1, 3], [0, 3], [0, 4], [0, 5], [3, 5], [3, 4], [3, 3], [3, 2], [2, 2], [1, 2], [0, 2], [4, 5], [4, 4], [4, 3], [4, 2], [4, 1], [3, 1], [2, 1], [1, 1], [0, 1], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]] },
];

tests.forEach((t, i) => {
  let res = spiralMatrixIII(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});