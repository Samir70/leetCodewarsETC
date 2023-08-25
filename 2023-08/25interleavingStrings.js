/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  if (s3.length !== s1.length + s2.length) { return false }
  let memo = {}
  const helper = (a, b, c) => {
    if (a === "" && b === "" && c === "") { return true }
    if (a === "") { return b === c }
    if (b === "") { return a === c }
    let key = [a, b, c].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let outcomeTakeFromA = false, outcomeTakeFromB = false
    if (a[0] === c[0]) {
      outcomeTakeFromA = helper(a.slice(1), b, c.slice(1))
    }
    if (b[0] === c[0]) {
      outcomeTakeFromB = helper(a, b.slice(1), c.slice(1))
    }
    memo[key] = outcomeTakeFromA || outcomeTakeFromB
    return memo[key]
  }
  return helper(s1, s2, s3)
};

const tests = [
  { args: ["aabcc", "dbbca", "aadbbcbcac"], out: true },
  { args: ["aabcc", "dbbca", "aadbbbaccc"], out: false },
  { args: ["", "", ""], out: true },
];

tests.forEach((t, i) => {
  let res = isInterleave(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});