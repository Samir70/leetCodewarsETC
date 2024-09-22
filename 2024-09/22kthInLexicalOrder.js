/**
 * @param {number} n
 * @return {number[]}
 * n is less than 10^9
 * need kth number in lexical order
 */
var findKthNumber = function (n, k) {
  let cur = 1
  k--
  while (k > 0) {
    let stepsToSibling = countSteps(n, cur, cur + 1)
    if (stepsToSibling <= k) {
      cur++
      k -= stepsToSibling
    } else {
      cur *= 10
      k--
    }
  }
  return cur
};
const countSteps = (n, a, b) => {
  let steps = 0
  while (a <= n) {
    steps += Math.min(n + 1, b) - a
    a *= 10
    b *= 10
  }
  return steps
}

const tests = [
  { args: [13, 2], out: 10 },
  { args: [130, 25], out: 120 },
  { args: [130, 22], out: 118 },
  { args: [130, 13], out: 11 },
  { args: [1000000000, 25], out: 100000014 },
  { args: [1398765, 27897], out: 1025102 },
  { args: [719885387, 209989719], out: 288990744 },
  { args: [1000000000, 1000000000], out: 999999999 },
  { args: [1, 1], out: 1 },
];

tests.forEach((t, i) => {
  let res = findKthNumber(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});