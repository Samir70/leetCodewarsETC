/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const markFound = (r, c) => {
    if (grid[r] === undefined || grid[r][c] !== '1') { return }
    grid[r][c] = '2'
    let next = [
      [0, 1], [0, -1], [1, 0], [-1, 0]
    ].map(d => [d[0] + r, d[1] + c])
    next.forEach(p => markFound(...p))
  }
  let count = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        count++
        markFound(r, c)
      }
    }
  }
  return count
};

const tests = [
  { args: [[["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]], out: 1 },
  { args: [[["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]]], out: 3 },
];

tests.forEach((t, i) => {
  let res = numIslands(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});