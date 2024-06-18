/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
var maxProfitAssignment = function (difficulty, profit, worker) {
  let diffPro = []
  for (let i = 0; i < profit.length; i++) {
    diffPro.push([difficulty[i], profit[i]])
  }
  diffPro.sort((a, b) => a[0] - b[0])
  worker.sort((a, b) => a - b)
  // console.log(diffPro)
  let moneyMade = 0, job = -1, bestProfit = 0
  for (let w of worker) {
    while (job + 1 < diffPro.length && diffPro[job + 1][0] <= w) {
      job++
      bestProfit = Math.max(bestProfit, diffPro[job][1])
    }
    // console.log({ w, job, bestProfit })
    moneyMade += bestProfit
  }
  return moneyMade
};

const tests = [
  { args: [[2, 4, 6, 8, 10], [10, 20, 30, 40, 50], [4, 5, 6, 7]], out: 100 },
  { args: [[2, 4, 6, 8, 10], [20, 10, 30, 40, 50], [4, 5, 6, 7]], out: 100 },
  { args: [[85, 47, 57], [24, 66, 99], [40, 25, 25]], out: 0 },
  {
    args: [[66, 1, 28, 73, 53, 35, 45, 60, 100, 44, 59, 94, 27, 88, 7, 18, 83, 18, 72, 63],
    [66, 20, 84, 81, 56, 40, 37, 82, 53, 45, 43, 96, 67, 27, 12, 54, 98, 19, 47, 77],
    [61, 33, 68, 38, 63, 45, 1, 10, 53, 23, 66, 70, 14, 51, 94, 18, 28, 78, 100, 16]],
    out: 1392
  },
];

tests.forEach((t, i) => {
  let res = maxProfitAssignment(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});