/**
 * @param {string} s
 * @return {boolean}
 * s contains (,) or *
 */
var checkValidString = function (s) {
  let openStack = [], wildStack = [];
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "(": { openStack.push(i); break }
      case "*": { wildStack.push(i); break }
      default: {
        if (openStack.length > 0) {
          openStack.pop()
        } else if (wildStack.length > 0) {
          wildStack.pop()
        } else {
          return false
        }
      }
    }
  }
  // console.log({ openStack, wildStack })
  while (openStack.length > 0) {
    if (wildStack.length === 0) { return false }
    let [open, wild] = [openStack.pop(), wildStack.pop()]
    if (open > wild) { return false }
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