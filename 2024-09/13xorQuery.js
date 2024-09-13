/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function (arr, queries) {
  let xor = 0, cumul = [];
  for (let n of arr) {
    xor ^= n;
    cumul.push(xor)
  }
  let out = []
  for (let [a, b] of queries) {
    out.push((cumul[a - 1] || 0) ^ cumul[b])
  }
  return out
};

const tests = [
  { args: [[1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]]], out: [2, 7, 14, 8] },
  { args: [[4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]]], out: [8, 0, 4, 4] },
];

tests.forEach((t, i) => {
  let res = xorQueries(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});