/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var appendCharacters = function (s, t) {
  let [left, right] = [0, 0]
  while (right < t.length) {
    if (left >= s.length) { break }
    if (s[left] === t[right]) {
      right++
    }
    left++
  }
  return t.length - right
};

const tests = [
  { args: ["coaching", "coding"], out: 4 },
  { args: ["abcde", "a"], out: 0 },
  { args: ["z", "abcde"], out: 5 },
];

tests.forEach((t, i) => {
  let res = appendCharacters(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});