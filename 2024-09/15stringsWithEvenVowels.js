/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function (s) {
  let parity = 0, vowels = new Set([..."aeiou"])
  let firstSeen = {0: -1}, maxLength = 0
  for (let i = 0; i< s.length; i++) {
    let c = s[i]
    if (vowels.has(c)) {
      parity ^= c.charCodeAt(0)
    }
    if (firstSeen[parity] === undefined) {
      firstSeen[parity] = i
    }
    maxLength = Math.max(maxLength, i - firstSeen[parity])
    // console.log({ c, parity })
  }
  return maxLength
};

const { bigtest, biggerTest } = require("./15bigtest")
console.log(bigtest.length, biggerTest.length)
const tests = [
  { args: ["eleetminicoworoep"], out: 13 },
  { args: ["leetcodeisgreat"], out: 5 },
  { args: ["bcbcbc"], out: 6 },
  { args: ["aeiou"], out: 0 },
  { args: ["eeeeee"], out: 6 },
  { args: [bigtest], out: 831 },
  { args: [biggerTest], out: 10500 },
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = findTheLongestSubstring(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});