/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  let mapS2T = {}, mapT2S = {}
  for (let i = 0; i < s.length; i++) {
    if (mapS2T[s[i]] && mapS2T[s[i]] !== t[i]) { return false }
    if (mapT2S[t[i]] && mapT2S[t[i]] !== s[i]) { return false }
    mapS2T[s[i]] = t[i]
    mapT2S[t[i]] = s[i]
  }
  return true
};

const tests = [
  { args: ["egg", "add"], out: true },
  { args: ["foo", "bar"], out: false },
  { args: ["paper", "title"], out: true },
  { args: ["badc", "baba"], out: false }
];

tests.forEach((t, i) => {
  let res = isIsomorphic(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});