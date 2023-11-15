/**
 * @param {number[]} arr
 * @return {number}
 */
var maximumElementAfterDecrementingAndRearranging = function (arr) {
  arr.sort((a, b) => a - b)
  let max = 1;
  for (let n of arr) {
    if (n <= max) { continue }
    max++
  }
  return Math.min(max, arr.length)
};

const tests = [
  { args: [[2, 2, 1, 2, 1]], out: 2 },
  { args: [[100, 1, 1000]], out: 3 },
  { args: [[1, 2, 3, 4, 5]], out: 5 },
];

tests.forEach((t, i) => {
  let res = maximumElementAfterDecrementingAndRearranging(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});