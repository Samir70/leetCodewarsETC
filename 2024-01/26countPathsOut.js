/**
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @return {number}
 */
const base = 10 ** 9 + 7
var findPaths = function (m, n, maxMove, startRow, startColumn) {
  const memo = {}
  const helper = (i, j, movesleft) => {
    if (movesleft === 0) { return 0 }
    let key = [i, j, movesleft].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let waysOut = 0;
    let nextLoc = [
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ].map(d => [d[0] + i, d[1] + j])
    for (let [r, c] of nextLoc) {
      if (r < 0 || r === m || c < 0 || c === n) { waysOut++; continue }
      waysOut += helper(r, c, movesleft - 1)
      waysOut %= base
    }
    memo[key] = waysOut
    return waysOut
  }
  return helper(startRow, startColumn, maxMove)
};

const tests = [
  { args: [2, 2, 2, 0, 0], out: 6 },
  { args: [1, 3, 3, 0, 1], out: 12 }, // [3, 2, 3], [5, 8, 5], [11, 12, 11]
  { args: [1, 3, 0, 0, 1], out: 0 },
  { args: [1, 1, 3, 0, 0], out: 4 },
  { args: [1, 1, 0, 0, 0], out: 0 },
  { args: [42, 32, 14, 14, 18], out: 1 },
  { args: [42, 32, 13, 14, 18], out: 0 },
  { args: [42, 32, 50, 14, 18], out: 655266404 },
];

tests.forEach((t, i) => {
  let res = findPaths(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});