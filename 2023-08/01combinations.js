/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  if (n === k) { return [[...Array(n)].map((x, i) => i + 1)] }
  if (k > n / 2) {
    let negatives = combine(n, n - k);
    let out = [];
    let allNums = [...Array(n)].map((x, i) => i + 1)
    for (let neg of negatives) {
      let s = new Set(neg)
      out.push(allNums.filter(x => !s.has(x)))
    }
    return out
  }
  let out = []
  for (let i = 1; i <= n; i++) { out.push([i]) }
  while (k > 1) {
    k--
    let newOut = []
    for (let comb of out) {
      let last = comb[comb.length - 1]
      for (let i = last + 1; i <= n; i++) {
        newOut.push([...comb, i])
      }
    }
    out = [...newOut]
  }
  return out
};

const tests = [
  { args: [4, 2], out: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]] },
  { args: [1, 1], out: [[1]] },
];

tests.forEach((t, i) => {
  let res = combine(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});