/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
const sig = s => {
  tally = {}
  for (let c of s) {
    tally[c] = (tally[c] || 0) + 1
  }
  return Object.values(tally).sort((a, b) => a - b).join(',') + Object.keys(tally).sort().join('')
}
var closeStrings = function (word1, word2) {
  // console.log(word1, sig(word1))
  return sig(word1) === sig(word2)
};

const tests = [
  { args: ["abc", "bca"], out: true },
  { args: ["a", "aa"], out: false },
  { args: ["cabbba", "abbccc"], out: true },
];

tests.forEach((t, i) => {
  let res = closeStrings(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});