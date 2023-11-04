/**
 * @param {number} n
 * @param {number[]} left
 * @param {number[]} right
 * @return {number}
 */
var getLastMoment = function (n, left, right) {
  // ants switch directions when they meet, but who cares? They don't need names
  let lm = 0;
  for (let ant of left) {
    lm = Math.max(lm, ant)
  }
  for (let ant of right) {
    lm = Math.max(lm, n - ant)
  }
  return lm
};

const tests = [
  { args: [4, [4, 3], [0, 1]], out: 4 },
  { args: [7, [], [0, 1, 2, 3, 4, 5, 6, 7]], out: 7 },
  { args: [7, [0, 1, 2, 3, 4, 5, 6, 7], []], out: 7 },
  {
    args: [
      50, [37, 23, 17, 10, 4, 1], [3, 7, 12, 15, 27, 32, 40]
    ], out: 47
  },
];

tests.forEach((t, i) => {
  let res = getLastMoment(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});