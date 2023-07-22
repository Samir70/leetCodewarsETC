/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
var knightProbability = function (n, k, row, column) {
  let memo = {}
  const helper = (n, k, row, column) => {
    if (k === 0) { return 1 }
    let key = [n, k, row, column].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let moves = [
      [-2, -1], [-2, 1],
      [-1, -2], [-1, 2],
      [1, -2], [1, 2],
      [2, -1], [2, 1]
    ].map(m => [m[0] + row, m[1] + column])
      .filter(m => m[0] >= 0 && m[0] < n && m[1] >= 0 && m[1] < n)
    let probs = moves.map(m => (1 / 8) * helper(n, k - 1, m[0], m[1]))
    // console.log({ k, moves, probs })
    memo[key] = probs.reduce((acc, val) => acc + val, 0)
    return memo[key]
  }
  return helper(n, k, row, column)
};

const tests = [
  { args: [3, 2, 0, 0], out: 0.0625 },
  { args: [1, 0, 0, 0], out: 1 },
  { args: [20, 10, 5, 6], out: 0.65854 },
];

tests.forEach((t, i) => {
  let res = knightProbability(...t.args);
  if (Math.abs(res - t.out) > 0.00001) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});