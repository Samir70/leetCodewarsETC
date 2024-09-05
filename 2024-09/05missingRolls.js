/**
 * @param {number[]} rolls
 * @param {number} mean
 * @param {number} n
 * @return {number[]}
 */
var missingRolls = function (rolls, mean, n) {
  let targetSum = mean * (n + rolls.length)
  targetSum -= rolls.reduce((a, c) => a + c, 0)
  console.log({ targetSum, n })
  if (targetSum > n * 6 || targetSum < n) { return [] }
  let firstGuess = Math.floor(targetSum / n)
  let out = Array(n).fill(firstGuess)
  targetSum -= firstGuess * n
  for (let i = 0; i < targetSum; i++) {
    out[i]++
  }
  return out
};

const tests = [
  { args: [[3, 2, 4, 3], 4, 2], out: [6, 6] },
  { args: [[1, 5, 6], 3, 4], out: [3, 2, 2, 2] },
  { args: [[1, 2, 3, 4], 6, 4], out: [] },
  { args: [[6, 3, 4, 3, 5, 3], 1, 6], out: [] },
  {
    args: [[4, 2, 2, 5, 4, 5, 4, 5, 3, 3, 6, 1, 2, 4, 2, 1, 6, 5, 4, 2, 3, 4, 2, 3, 3, 5, 4, 1, 4, 4, 5, 3, 6, 1, 5, 2, 3, 3, 6, 1, 6, 4, 1, 3],
      2,
      53], out: []
  },
];

tests.forEach((t, i) => {
  let res = missingRolls(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});