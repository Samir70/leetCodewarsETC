/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
  let ones = 0
  for (let c of s) {
    ones += c === "1" ? 1 : 0
  }
  let score = s[0] === "0" ? 1 + ones : ones - 1
  let max = score
  for (let c of s.slice(1, -1)) {
    score += c === "0" ? 1 : -1
    max = Math.max(max, score)
  }
  return max
};

const tests = [
  { args: ["011101"], out: 5 },
  { args: ["00111"], out: 5 },
  { args: ["00"], out: 1 },
  { args: ["1111"], out: 3 },
];

tests.forEach((t, i) => {
  let res = maxScore(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});