/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function (grid1, grid2) {
  let isSubIsland = true
  const markFound = (r, c) => {
    if (grid2[r] === undefined || grid2[r][c] !== 1) { return }
    grid2[r][c] = 2
    if (grid1[r][c] !== 1) { isSubIsland = false }
    let next = [
      [0, 1], [0, -1], [1, 0], [-1, 0]
    ].map(d => [d[0] + r, d[1] + c])
    next.forEach(p => markFound(...p))
  }
  let count = 0
  for (let r = 0; r < grid2.length; r++) {
    for (let c = 0; c < grid2[0].length; c++) {
      if (grid2[r][c] === 1) {
        isSubIsland = true
        markFound(r, c)
        if (isSubIsland) { count++ }
      }
    }
  }
  return count
};

const tests = [
  {
    args: [
      [[1, 1, 1, 0, 0], [0, 1, 1, 1, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 0, 1, 1]],
      [[1, 1, 1, 0, 0], [0, 0, 1, 1, 1], [0, 1, 0, 0, 0], [1, 0, 1, 1, 0], [0, 1, 0, 1, 0]]
    ],
    out: 3
  },
  {
    args: [
      [[1, 0, 1, 0, 1], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [1, 0, 1, 0, 1]],
      [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]]
    ],
    out: 2
  },
];

tests.forEach((t, i) => {
  let res = countSubIslands(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});