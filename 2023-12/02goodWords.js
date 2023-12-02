/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
const isGood = (tally, word) => {
  for (let w of word) {
    if (!tally[w]) { return false }
    tally[w]--
  }
  return true
}
var countCharacters = function (words, chars) {
  let tally = {}
  for (let c of chars) {
    tally[c] = (tally[c] || 0) + 1
  }
  let sum = 0;
  for (let w of words) {
    if (isGood({ ...tally }, w)) { sum += w.length }
  }
  return sum
};

const tests = [
  { args: [["cat", "bt", "hat", "tree"], "atach"], out: 6 },
  { args: [["hello", "world", "leetcode"], "welldonehoneyr"], out: 10 },
];

tests.forEach((t, i) => {
  let res = countCharacters(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});