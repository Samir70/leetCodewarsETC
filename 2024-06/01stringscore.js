/**
 * @param {string} s
 * @return {number}
 */
var scoreOfString = function (s) {
  let vals = [...s].map(c => c.charCodeAt(0))
  let total = 0
  for (let i = 1; i < s.length; i++) {
    total += Math.abs(vals[i] - vals[i - 1])
  }
  return total
};
// faster:
var scoreOfString = function(s) {
  let total = 0
  for (let i = 1; i < s.length; i++) {
      total += Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1))
  }
  return total
};

const tests = [
  { args: ["hello"], out: 13 },
  { args: ["zaz"], out: 50 },
];

tests.forEach((t, i) => {
  let res = scoreOfString(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});