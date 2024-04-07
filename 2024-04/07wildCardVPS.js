/**
 * @param {string} s
 * @return {boolean}
 * s contains (,) or *
 */
var checkValidString = function (s) {
  let [openBrackets, closeBrackets, wildCard] = [0, 0, 0]
  for (let i = 0; i < s.length; i++) {
    let fromStart = s[i]
    switch (fromStart) {
      case "(": { openBrackets++; break }
      case ")": { openBrackets--; break }
      default: { wildCard++ }
    }
    if (openBrackets < 0 && wildCard <= 0) { return false }
    if (openBrackets < 0) { wildCard--; openBrackets++ }
  }
  wildCard = 0;
  // if (wildCard - openBrackets < 0) { return false }
  for (let i = s.length - 1; i >= 0; i--) {
    let fromEnd = s[i]
    switch (fromEnd) {
      case ")": { closeBrackets++; break }
      case "(": { closeBrackets--; break }
      default: { wildCard++ }
    }
    if (closeBrackets < 0 && wildCard <= 0) { return false }
    if (closeBrackets < 0) { wildCard--; closeBrackets++ }
  }
  return wildCard - closeBrackets >= 0
};

const tests = [
  { args: ["(*))"], out: true },
  { args: ["*)"], out: true },
  { args: [")*"], out: false },
  { args: ["***))"], out: true },
  { args: ["(**(*()**()**((**(*)"], out: true },
  { args: ["(((((*(()((((*((**(((()()*)()()()*((((**)())*)*)))))))(())(()))())((*()()(((()((()*(())*(()**)()(())"], out: false },
  // "))))((*(((((**(**)"
];

tests.forEach((t, i) => {
  let res = checkValidString(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});