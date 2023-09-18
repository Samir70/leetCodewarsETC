/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
const countOnes = arr => {
  let count = 0;
  while (arr[count] === 1) { count++ }
  return count
}
var kWeakestRows = function (mat, k) {
  let sorted = mat.map((r, i) => [countOnes(r), i]).sort((a, b) => a[0] - b[0])
  return sorted.map(r => r[1]).slice(0, k)
};

const tests = [
  { args: [[[1, 1, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 1, 0, 0, 0], [1, 1, 1, 1, 1]], 3], out: [2, 0, 3] },
  { args: [[[1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0]], 2], out: [0, 2] },
];

tests.forEach((t, i) => {
  let res = kWeakestRows(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});