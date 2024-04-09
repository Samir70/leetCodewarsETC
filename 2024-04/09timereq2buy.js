/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
var timeRequiredToBuy = function (tickets, k) {
  let time = 0;
  for (let i = 0; i <= k; i++) {
    time += Math.min(tickets[i], tickets[k])
  }
  for (let i = k + 1; i < tickets.length; i++) {
    time += Math.min(tickets[i], tickets[k] - 1)
  }
  return time
};

const tests = [
  { args: [[2, 3, 2], 2], out: 6 },
  { args: [[5, 1, 1, 1], 0], out: 8 },
];

tests.forEach((t, i) => {
  let res = timeRequiredToBuy(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});