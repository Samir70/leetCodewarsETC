/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  let tally = new Map()
  if (s.length !== t.length) { return false }
  for (let c of s) {
    if (!tally.has(c)) { tally.set(c, 0) }
    tally.set(c, tally.get(c) + 1)
  }
  for (let c of t) {
    if (!tally.has(c)) { return false }
    tally.set(c, tally.get(c) - 1)
    if (tally.get(c) < 0) { return false }
  }
  for (let key of tally) {
    // console.log(key, tally.get(key[0]))
    if (key[1] !== 0) { return false }
  }
  return true
};

const tests = [
  { args: ["anagram", "nagaram"], out: true },
  { args: ["rat", "car"], out: false },
];

tests.forEach((t, i) => {
  let res = isAnagram(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});