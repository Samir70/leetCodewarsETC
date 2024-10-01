/**
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */
var canArrange = function (arr, k) {
  let modBucket = Array(k).fill(0)
  for (let n of arr) {
    let mod = (n % k)
    if (mod < 0) { mod += k }
    // console.log({ n, mod })
    modBucket[mod]++
  }
  // if (k === 2) { return modBucket[1] % 2 === 0 }
  for (let n = 1; n < k; n++) {
    if (modBucket[n] !== modBucket[k - n]) { return false }
  }
  return k % 2 ? true : modBucket[k / 2] % 2 === 0
};

const { bigtest } = require("./01bigtest")
const tests = [
  { args: [[1, 2, 3, 4, 5, 10, 6, 7, 8, 9], 5], out: true },
  { args: [[1, 2, 3, 4, 5, 6], 7], out: true },
  { args: [[-6, 6], 7], out: true },
  { args: [[1, 2, 3, 4, 5, 6], 10], out: false },
  { args: [[2, 2, 2, 4], 4], out: false },
  { args: [[987654321, -987654321, 765432100, -765432100], 99999], out: true },
  { args: [bigtest, 2], out: false },
];

tests.forEach((t, i) => {
  let res = canArrange(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});