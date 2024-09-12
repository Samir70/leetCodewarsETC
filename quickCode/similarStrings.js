/**
 * @param {string[]} words
 * @return {number}
 */
var similarPairs = function (words) {
  let sigs = words.map(w => new Set([...w]))
    .map(s => [...s].sort().join(""))
  let seen = {}, count = 0
  for (let sig of sigs) {
    seen[sig] = (seen[sig] || 0) + 1
    count += seen[sig] - 1
  }
  return count
};

const tests = [
  { args: [["aba", "aabb", "abcd", "bac", "aabc"]], out: 2 },
  { args: [["aabb", "ab", "ba"]], out: 3 },
  { args: [["aabb", "ab", "ba", "ababab"]], out: 6 },
  { args: [["nba", "cba", "dba"]], out: 0 },
];

tests.forEach((t, i) => {
  let res = similarPairs(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});