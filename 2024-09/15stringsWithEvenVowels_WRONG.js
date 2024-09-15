/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function (s) {
  let maxLengthEachVowel = [], vowels = new Set([..."aeiou"])
  for (let v of vowels) {
    let [indexFirstEven, indexFirstOdd, tally] = [-1, null, 0]
    let maxThisVowel = []
    for (let i = 0; i < s.length; i++) {
      if (s[i] === v) {
        tally++
        if (tally % 2 && indexFirstOdd === null) {
          indexFirstOdd = i
        }
      }
      maxThisVowel.push(tally % 2 ? i - indexFirstOdd : i - indexFirstEven)
      // if (v === "e") {
      //   console.log({ v, maxThisVowel, i, tally, indexFirstOdd})
      // }
    }
    maxLengthEachVowel.push(maxThisVowel)
  }
  let minEachIndex = []
  // console.log(maxLengthEachVowel)
  for (let i = 0; i < s.length; i++) {
    let min = Infinity
    for (let j = 0; j < 5; j++) {
      min = Math.min(min, maxLengthEachVowel[j][i])
    }
    minEachIndex.push(min)
  }
  return Math.max(...minEachIndex)
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