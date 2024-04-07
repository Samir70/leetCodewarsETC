/**
 * @param {string} s
 * @return {boolean}
 * s contains (,) or *
 */
var checkValidString = function (s) {
  let [left, right] = [0, s.length - 1]
  let [openCount, closedCount] = [0, 0]
  while (left < s.length) {
    s[left] === "(" || s[left] === "*" ? openCount++ : openCount--
    s[right] === ")" || s[right] === "*"? closedCount++ : closedCount--
    if (openCount < 0 || closedCount < 0) { return false }
    left++; right--
  }
  return true
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