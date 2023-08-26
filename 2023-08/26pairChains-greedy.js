/**
 * @param {number[][]} pairs
 * @return {number}
 * [a, b] can be followed by [c, d] in a chain if b < c
 */
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[1] - b[1]);
  let maxChain = 0, tail = -Infinity;
  for (let [a, b] of pairs) {
    if (a > tail) {
      maxChain++
      tail = b
    }
  }
  return maxChain
};

const tests = [
  { args: [[[1, 2], [2, 3], [3, 4]]], out: 2 },
  { args: [[[1, 2], [7, 8], [4, 5]]], out: 3 },
];

tests.forEach((t, i) => {
  let res = findLongestChain(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});