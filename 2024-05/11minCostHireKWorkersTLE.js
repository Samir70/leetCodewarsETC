/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} k
 * @return {number}
 * https://leetcode.com/problems/minimum-cost-to-hire-k-workers
 */
var mincostToHireWorkers = function (quality, wage, k) {
  /**
   * No point scaling up the wages of all k workers, 
   * So somebody is getting their min wage
   */
  const payIfIgetsMin = i => {
    let w = wage[i]
    let out = [], unhirable = 0
    for (let j = 0; j < quality.length; j++) {
      let relWage = (quality[j] / quality[i]) * w
      if (relWage < wage[j]) { unhirable++; relWage = Infinity }
      if (unhirable + k > wage.length) { return null }
      out.push(relWage)
    }
    return out.sort((a, b) => a - b)
  }
  let cost = Infinity
  for (let i = 0; i < wage.length; i++) {
    let relPay = payIfIgetsMin(i)
    // console.log(relPay)
    cost = Math.min(cost, relPay ? relPay.slice(0, k).reduce((a, c) => a + c, 0) : Infinity)
  }
  return cost
};

const { quality, wage, k } = require("./11bigtest")

const tests = [
  { args: [[10, 20, 5], [70, 50, 30], 2], out: 105 },
  { args: [[3, 1, 10, 10, 1], [4, 8, 2, 2, 7], 3], out: 30.66667 },
  { args: [quality, wage, k], out: 67078.64640 }
];

tests.forEach((t, i) => {
  let res = mincostToHireWorkers(...t.args);
  if (Math.abs(res - t.out) > 10 ** -5) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});