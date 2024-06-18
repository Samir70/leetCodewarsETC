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