/**
 * @param {string} s
 * @return {number}
 * s is a Valid Parenthesis String
 */
var maxDepth = function (s) {
  let [out, depth] = [0, 0]
  for (let c of s) {
    if (c === "(") {
      depth++
    } else if (c === ")") {
      depth--
    }
    out = Math.max(out, depth)
  }
  return out
};

const tests = [
  { args: ["(1+(2*3)+((8)/4))+1"], out: 3 },
  { args: ["(1)+((2))+(((3)))"], out: 3 },
];

tests.forEach((t, i) => {
  let res = maxDepth(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});