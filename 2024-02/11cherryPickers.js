/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function (grid) {
  let rows = grid.length, cols = grid[0].length;
  const offGrid = col => col < 0 || col >= cols
  const cherrysAt = (r, c) => grid[r][c] || 0
  // let calls = 0
  let memo = {}
  // adding a memo dropped calls to helper from 12817 to 496 
  // for grid that is 5 x 7
  const helper = (row, colA, colB) => {
    // calls++
    if (row >= rows || offGrid(colA) || offGrid(colB)) { return 0 }
    let key = [row, colA, colB].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let start = cherrysAt(row, colA)
    if (colA !== colB) { start += cherrysAt(row, colB) }
    let LL = helper(row + 1, colA - 1, colB - 1)
    let BL = helper(row + 1, colA, colB - 1)
    let RL = helper(row + 1, colA + 1, colB - 1)
    let LB = helper(row + 1, colA - 1, colB)
    let BB = helper(row + 1, colA, colB)
    let RB = helper(row + 1, colA + 1, colB)
    let LR = helper(row + 1, colA - 1, colB + 1)
    let BR = helper(row + 1, colA, colB + 1)
    let RR = helper(row + 1, colA + 1, colB + 1)
    // console.log({ row, colA, colB, start, LL, BL })
    memo[key] = start + Math.max(LL, BL, RL, LB, BB, RB, LR, BR, RR)
    return memo[key]
  }
  let out = helper(0, 0, cols - 1)
  // console.log(calls)
  return out
};

const tests = [
  { args: [[[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]]], out: 24 },
  {
    args: [[
      [1, 0, 0, 0, 0, 0, 1],
      [2, 0, 0, 0, 0, 3, 0],
      [2, 0, 9, 0, 0, 0, 0],
      [0, 3, 0, 5, 4, 0, 0],
      [1, 0, 2, 3, 0, 0, 6]
    ]], out: 28
  },
];

tests.forEach((t, i) => {
  let res = cherryPickup(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});