/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const factorial = n => n === 0 ? 1 : n * factorial(n - 1)
var uniquePaths = function (m, n) {
  return factorial((m - 1) + (n - 1)) / (factorial(m - 1) * factorial(n - 1))
};

const tests = [
  { args: [3, 7], out: 28 },
  { args: [3, 2], out: 3 },
  { args: [10, 10], out: 48620 },
  { args: [12, 14], out: 2496144 },
];

tests.forEach((t, i) => {
  let res = uniquePaths(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});