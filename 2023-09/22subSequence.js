const isSubSequence = (s, t) => {
  if (s.length === 0) { return true }
  if (s.length > t.length) { return false }
  var [ps, pt] = [0, 0];
  var look4 = s[0];
  while (pt < t.length) {
    if (look4 === t[pt]) {
      ps++;
      if (ps === s.length) { return true }
      look4 = s[ps]
    }
    pt++
  }
  return false
}

const tests = [
  { args: ["abc", "ahbgdc"], out: true },
  { args: ["axc", "ahbgdc"], out: false },
  { args: ["abc", "ahjlkdjfgljlkdjfgbglkjlkjldkfjglkjlkjlkjgfdlkjdc"], out: true },
  { args: ["", "sdjfhlskdajfh"], out: true },
  { args: ["abcdef", "abc"], out: false }
];

tests.forEach((t, i) => {
  let res = isSubSequence(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});