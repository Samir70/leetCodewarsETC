/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (a, b) {
  var sigA = {}
  for (var c of a) {
    sigA[c] = (sigA[c] || 0) + 1;
  }
  var sigB = {}
  for (var c of b.slice(0, a.length)) {
    sigB[c] = (sigB[c] || 0) + 1;
  }
  const compareSigs = (s, t) => {
    for (var prop in s) {
      if (s[prop] !== t[prop]) { return false }
    }
    return true
  }
  var left = 0, right = a.length - 1;
  while (right < b.length) {
    // console.log(sigA, sigB)
    if (compareSigs(sigA, sigB)) { return true }
    sigB[b[left]]--;
    left++;
    right++;
    sigB[b[right]] = (sigB[b[right]] || 0) + 1
  }
  return false
};

const tests = [
  { args: ["ab", "eidbaooo"], out: true },
  { args: ["ab", "eidboaoo"], out: false },
];

tests.forEach((t, i) => {
  let res = checkInclusion(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});