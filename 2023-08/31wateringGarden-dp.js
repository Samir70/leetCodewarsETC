// https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/editorial/

/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
  
};

const tests = [
  { args: [5, [3, 4, 1, 1, 0, 0]], out: 1 },
  { args: [5, [1, 1, 2, 1, 1, 0]], out: 2 },
  { args: [5, [3, 3, 1, 1, 0, 0]], out: -1 },
  { args: [9, [0, 5, 0, 3, 3, 3, 1, 4, 0, 4]], out: 2 },
  { args: [3, [0, 0, 0, 0]], out: -1 },
];

tests.forEach((t, i) => {
  // if (i !== 3) { return }
  let res = minTaps(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});