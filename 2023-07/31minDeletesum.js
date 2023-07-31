/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const ord = c => c.charCodeAt(0)
const ordSum = s => [...s].map(ord).reduce((a, c) => a + c, 0)
var minimumDeleteSum = function (s1, s2) {
  const memo = {}
  const helper = (a, b) => {
    if (a === b) { return 0 }
    if (a.length === 0) { return ordSum(b) }
    if (b.length === 0) { return ordSum(a) }
    let key = [a, b].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    if (a[0] === b[0]) { return helper(a.slice(1), b.slice(1)) }
    let delFirstOfA = ord(a[0]) + helper(a.slice(1), b)
    let delFirstOfB = ord(b[0]) + helper(a, b.slice(1))
    let delFirstOfBoth = ordSum(a[0] + b[0]) + helper(a.slice(1), b.slice(1))
    memo[key] = Math.min(delFirstOfA, delFirstOfB, delFirstOfBoth)
    return memo[key]
  }
  return helper(s1, s2)
};
// perhaps compare to edit distance in stringConversion.js


const tests = [
  { args: ["sea", "eat"], out: 231 },
  { args: ["delete", "leet"], out: 403 },
  { args: ["whatapalaveridosay", "hellohellohello"], out: 2677 }
];

tests.forEach((t, i) => {
  let res = minimumDeleteSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});