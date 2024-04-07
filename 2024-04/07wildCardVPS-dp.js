/**
 * @param {string} s
 * @return {boolean}
 * s contains (,) or *
 */
var checkValidString = function (s) {
  let memo = {}
  const helper = (i, openCount) => {
    let key = [i, openCount].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    if (openCount < 0) { return false }
    if (i === s.length) {
      return openCount === 0
    }
    let outcome
    switch (s[i]) {
      case "(": { outcome = helper(i + 1, openCount + 1); break }
      case ")": { outcome = helper(i + 1, openCount - 1); break }
      default: {
        let leaveAsWild = helper(i + 1, openCount)
        let setAsOpen = helper(i + 1, openCount + 1)
        let setAsClosed = helper(i + 1, openCount - 1)
        outcome = leaveAsWild || setAsOpen || setAsClosed
      }
    }
    memo[key] = outcome
    return outcome
  }
  return helper(0, 0)
};

const tests = [
  { args: ["(*))"], out: true },
  { args: ["*)"], out: true },
  { args: [")*"], out: false },
  { args: ["***))"], out: true },
  { args: ["(**(*()**()**((**(*)"], out: true },
  { args: ["(((((*(()((((*((**(((()()*)()()()*((((**)())*)*)))))))(())(()))())((*()()(((()((()*(())*(()**)()(())"], out: false },
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