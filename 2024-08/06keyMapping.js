/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function (word) {
  let tally = Array(26).fill(0)
  let code = c => c.charCodeAt(0) - "a".charCodeAt(0)
  for (let c of word) {
    tally[code(c)]++
  }
  let toType = tally.filter(val => val > 0).sort((a, b) => b - a)
  let count = 0, i = 0, level = 1
  let numKeys = 8
  while (i < toType.length) {
    let batch = toType.slice(i, i + numKeys)
    count += batch.reduce((a, v) => a + v) * level
    i += numKeys
    level++
  }
  return count
};

const tests = [
  { args: ["abcde"], out: 5 },
  { args: ["abcdefgh"], out: 8 },
  { args: ["abcdefghi"], out: 10 },
  { args: ["abcdefghijklmnopqrstuvwxyz"], out: 56 },
  { args: ["abcdefghijklmnopqrstuvwxyzhdj"], out: 59 },
  { args: ["xyzxyzxyzxyz"], out: 12 },
  { args: ["aabbccddeeffgghhiiiiii"], out: 24 },
];

tests.forEach((t, i) => {
  let res = minimumPushes(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});