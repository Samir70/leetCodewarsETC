/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
  let n = piles.length
  let suffixSum = [...piles]
  let memo = [Array(n).fill(0)]
  for (let i = n - 2; i >= 0; i--) {
    suffixSum[i] += suffixSum[i + 1]
    memo.push(Array(n).fill(0))
  }
  // console.log({ piles, suffixSum })
  const maxStonesFromI = (i, m) => {
    if (i + 2 * m >= n) { return suffixSum[i] }
    if (memo[i][m] > 0) { return memo[i][m] }
    let res = Infinity
    for (let take = 1; take <= 2 * m; take++) {
      res = Math.min(res, maxStonesFromI(i + take, Math.max(take, m)))
      // console.log({ i, m, take, res })
    }
    // console.log({ i, m, res })
    memo[i][m] = suffixSum[i] - res
    return memo[i][m]
  }
  return maxStonesFromI(0, 1)
};

const tests = [
  { args: [[2]], out: 2 },
  { args: [[2, 7]], out: 9 },
  { args: [[9, 4, 4]], out: 13 },
  { args: [[7, 9, 4, 4]], out: 16 },
  { args: [[2, 7, 9, 4, 4]], out: 10 },
  { args: [[1, 2, 3, 4, 5, 100]], out: 104 },
];

tests.forEach((t, i) => {
  // if (i >= 4) { return }
  let res = stoneGameII(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});