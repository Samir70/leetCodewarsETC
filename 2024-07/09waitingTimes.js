/**
 * @param {number[][]} customers
 * @return {number}
 */
var averageWaitingTime = function (customers) {
  let cur = 0, totalWait = 0;
  for (let c of customers) {
    cur = Math.max(cur, c[0]) + c[1]
    totalWait += cur - c[0]
  }
  return totalWait / customers.length
};

const tests = [
  { customers: [[1, 2], [2, 5], [4, 3]], out: 5.0 },
  { customers: [[5, 2], [5, 4], [10, 3], [20, 1]], out: 3.25 },
  { customers: [[2, 3], [6, 3], [7, 5], [11, 3], [15, 2], [18, 1]], out: 4.16667 }
];

tests.forEach((t, i) => {
  let res = averageWaitingTime(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});