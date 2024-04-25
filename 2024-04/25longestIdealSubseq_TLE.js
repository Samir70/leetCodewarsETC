/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestIdealString = function (s, k) {
  const startAtIdx = Array(s.length).fill(1)
  const diff = (a, b) => Math.abs(a.charCodeAt(0) - b.charCodeAt(0))
  let best = 0
  for (let left = s.length - 1; left >= 0; left--) {
    let right = left + 1
    while (s[right]) {
      if (diff(s[left], s[right]) <= k) {
        startAtIdx[left] = Math.max(startAtIdx[left], 1 + startAtIdx[right])
      }
      right++
    }
    best = Math.max(best, startAtIdx[left])
  }
  // console.log(s, startAtIdx)
  return best
};


const { bigString } = require("./25bigString")
const tests = [
  { args: ["acfgbd", 2], out: 4 },
  { args: ["abcd", 3], out: 4 },
  { args: ["eduktdb", 15], out: 5 },
  { args: [bigString, 8], out: 48822 },
];

tests.forEach((t, i) => {
  let res = longestIdealString(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});