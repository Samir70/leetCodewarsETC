/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 * https://leetcode.com/problems/minimum-cost-to-convert-string-i/editorial/
 */
var minimumCost = function (source, target, original, changed, cost) {
  const aCode = 97
  const table = []
  for (let i = 0; i < 26; i++) {
    table.push(Array(26).fill(Infinity))
    table[i][i] = 0
  }
  const idx = char => char.charCodeAt(0) - aCode
  for (let i = 0; i < original.length; i++) {
    let [from, to] = [idx(original[i]), idx(changed[i])]
    table[from][to] = Math.min(table[from][to], cost[i])
  }
  
  for (let k = 0; k < 26; k++) {
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 26; j++) {
        table[i][j] = Math.min(
          table[i][j],
          table[i][k] + table[k][j]
        )
      }
    }
  }
  let ans = 0
  for (let i = 0; i < source.length; i++) {
    let [from, to] = [idx(source[i]), idx(target[i])]
    ans += table[from][to]
  }
  return ans === Infinity ? -1 : ans
};

const tests = [
  { args: ["abcd", "acbe", ["a", "b", "c", "c", "e", "d"], ["b", "c", "b", "e", "b", "e"], [2, 5, 5, 1, 2, 20]], out: 28 },
  { args: ["aaaa", "bbbb", ["a", "c"], ["c", "b"], [1, 2]], out: 12 },
  { args: ["abcd", "abce", ["a"], ["e"], [10000]], out: -1 },
];

tests.forEach((t, i) => {
  let res = minimumCost(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});