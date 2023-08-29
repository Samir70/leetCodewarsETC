/**
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function (customers) {
  const n = customers.length;
  let minPenalty = Infinity, hour = -1;
  let openForNo_onePenalties = [], closedForSomeonePenalties = Array(n).fill(0)
  let countNs = 0, countYs = 0;
  for (let left = 0; left < n; left++) {
    if (customers[left] === 'N') { countNs++ }
    openForNo_onePenalties.push(countNs)
  }
  for (let right = n - 1; right >= 0; right--) {
    if (customers[right] === 'Y') { countYs++ }
    closedForSomeonePenalties[right] = countYs
  }
  for (let i = 0; i <= n; i++) {
    let penalty = (openForNo_onePenalties[i - 1] || 0) + (closedForSomeonePenalties[i] || 0);
    // console.log({ i, penalty, openForNo_onePenalties, closedForSomeonePenalties })
    if (penalty < minPenalty) {
      minPenalty = penalty;
      hour = i
    }
  }
  return hour
};

const tests = [
  { args: ["YYNY"], out: 2 },
  { args: ["NNNNN"], out: 0 },
  { args: ["YYYY"], out: 4 },
  { args: ["YYYYNNYNNNNNNYYYYYYNNYNNNNYYYYYYYYYYNNYYYYYY"], out: 44 },
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = bestClosingTime(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
