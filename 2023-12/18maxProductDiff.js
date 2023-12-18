/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProductDifference = function (nums) {
  // to find smallest, largest
  let [a, b] = [Infinity, Infinity];
  let [y, z] = [0, 0]
  for (let n of nums) {
    if (n > z) {
      [y, z] = [z, n]
    } else if (n > y) {
      y = n
    }
    if (n < a) {
      [a, b] = [n, a]
    } else if (n < b) {
      b = n
    }
  }
  // console.log([a, b], [y, z]);
  return y * z - a * b
};

const tests = [
  { args: [[5, 6, 2, 7, 4]], out: 34 },
  { args: [[4, 2, 5, 9, 7, 4, 8]], out: 64 },
];

tests.forEach((t, i) => {
  let res = maxProductDifference(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});