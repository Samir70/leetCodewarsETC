/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 * s, t are same length and only have lowercase english letters
 */
var minSteps = function (s, t) {
  let letterCounts = Array(26).fill(0)
  const id = c => c.charCodeAt(0) - "a".charCodeAt(0)
  for (let i = 0; i < s.length; i++) {
    let [a, b] = [s[i], t[i]];
    letterCounts[id(a)]++;
    letterCounts[id(b)]--;
  }
  // console.log(letterCounts)
  return letterCounts.filter(c => c > 0).reduce((a, c) => a + c, 0)
};

const tests = [
  { args: ["bab", "aba"], out: 1 },
  { args: ["leetcode", "practice"], out: 5 },
  { args: ["anagram", "mangaar"], out: 0 },
];

tests.forEach((t, i) => {
  let res = minSteps(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});