/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
var equalSubstring = function (s, t, maxCost) {
  let diffs = []
  let same = 0, maxSame = 0
  let changes = 0
  for (let i = 0; i < s.length; i++) {
    diffs.push(Math.abs(s[i].charCodeAt(0) - t[i].charCodeAt(0)))
  }
  let [left, right] = [0, 0]
  while (right < s.length) {
    if (changes + diffs[right] <= maxCost) {
      changes += diffs[right++]
      same++
      maxSame = Math.max(maxSame, same)
    } else {
      if (same > 0) {
        changes -= diffs[left]
        same--
      }
      left++
      if (left > right) { right++ }
    }
  }
  return maxSame
};

const tests = [
  { args: ["abcd", "bcdf", 3], out: 3 },
  { args: ["abcd", "zzzd", 3], out: 1 },
  { args: ["abcd", "zzzz", 3], out: 0 },
  { args: ["abcd", "cdef", 3], out: 1 },
  { args: ["abcd", "acde", 0], out: 1 },
];

tests.forEach((t, i) => {
  let res = equalSubstring(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});