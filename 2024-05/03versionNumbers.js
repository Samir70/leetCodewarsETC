/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  let va = version1.split("."), vb = version2.split(".")
  let n = Math.max(va.length, vb.length)
  for (let i = 0; i < n; i++) {
    let [a, b] = [Number(va[i] || 0), Number(vb[i] || 0)]
    // console.log({ a, b, v: [va[i], vb[i]] })
    if (a === b) { continue }
    return a < b ? -1 : 1
  }
  return 0
};

const tests = [
  { args: ["1.01", "1.001"], out: 0 },
  { args: ["1.0", "1.0.0"], out: 0 },
  { args: ["0.1", "1.1"], out: -1 },
];

tests.forEach((t, i) => {
  let res = compareVersion(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});