/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
  let letterCounts = []
  let index = s.charCodeAt(0) - 97
  let curCount = Array(26).fill(0)
  letterCounts.push(curCount)
  curCount[index]++
  let firstOccurance = { }, lastOccurance = { }
  firstOccurance[index] = 0;
  lastOccurance[index] = 0;
  for (let i = 1; i < s.length; i++) {
    let prev = [...curCount]
    index = s.charCodeAt(i) - 97;
    prev[index]++
    curCount = [...prev]
    letterCounts.push(curCount)
    if (firstOccurance[index] === undefined) {
      firstOccurance[index] = i
    }
    lastOccurance[index] = i
  }
  // console.log(letterCounts)
  let palCount = 0
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 26; j++) {
      let firstI = firstOccurance[i], lastI = lastOccurance[i];
      if (firstI === undefined) { continue }
      let countOfLetterJ = letterCounts[lastI][j] - letterCounts[firstI][j]
      countOfLetterJ -= i === j ? 1 : 0
      if (countOfLetterJ > 0) { palCount++ }
      // console.log({ i, j, firstI, lastI, palCount, countOfLetterJ, c1: letterCounts[lastI][j], c2: letterCounts[firstI][j] })
    }
  }
  return palCount
};

const tests = [
  { args: ["aabca"], out: 3 },
  { args: ["adc"], out: 0 },
  { args: ["bbcbaba"], out: 4 },
  { args: ["abcdefghijklmnopqrstuvwxyzyxwvutsrqponmlkjihgfedcbabcdefhijklmnopqrstuvwxyz"], out: 667 },
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = countPalindromicSubsequence(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});