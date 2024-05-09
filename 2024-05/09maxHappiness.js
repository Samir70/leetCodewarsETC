/**
 * @param {number[]} happiness
 * @param {number} k
 * @return {number}
 */
var maximumHappinessSum = function (happiness, k) {
  happiness.sort((a, b) => b - a)
  let sum = 0, i = 0
  while (k > 0) {
    sum += Math.max(happiness[i] - i, 0)
    // console.log({sum, i, h:happiness[i] - i})
    k--
    i++
  }
  return sum
};

const tests = [
  { args: [[1, 2, 3], 2], out: 4 },
  { args: [[1, 1, 1, 1], 2], out: 1 },
  { args: [[2, 3, 4, 5], 1], out: 5 },
];

tests.forEach((t, i) => {
  let res = maximumHappinessSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});