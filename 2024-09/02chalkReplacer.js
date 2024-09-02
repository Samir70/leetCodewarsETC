/**
 * @param {number[]} chalk
 * @param {number} k
 * @return {number}
 */
var chalkReplacer = function (chalk, k) {
  let sum = chalk.reduce((acc, val) => acc + val, 0);
  k = k % sum
  for (let i = 0; i < chalk.length; i++) {
    if (k < chalk[i]) { return i }
    k -= chalk[i]
  }
};

const tests = [
  { args: [[5, 1, 5], 22], out: 0 },
  { args: [[3, 4, 1, 2], 25], out: 1 },
];

tests.forEach((t, i) => {
  let res = chalkReplacer(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});