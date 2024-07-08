/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
  ans = 0
  for (let i = 2; i < n + 1; i++) {
    ans = (ans + k) % i
  }
  return ans + 1
};

const tests = [
  { args: [5, 2], out: 3 },
  { args: [6, 5], out: 1 },
  { args: [500, 499], out: 121 },
  { args: [500, 38], out: 381 },
];

tests.forEach((t, i) => {
  let res = findTheWinner(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});