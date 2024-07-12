/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const findScore = (str, x, y) => {
  let as = 0, bs = 0;
  let abs = 0, bas = 0;
  for (let s of str) {
    if (s === 'a') {
      as++
    } else if (as > abs) { abs++ }
  }
  for (let s of str) {
    if (s === 'b') {
      bs++
    } else if (bs > bas) { bas++ }
  }
  // bs used up in either abs or bas; some counted twice
  let out
  if (x > y) {
    out = abs * x + Math.min(bs - abs, as - abs) * y
  } else { out = bas * y + Math.min(bs - bas, as - bas) * x }
  // console.log(str, x, y, '-->', abs, bas, out)
  return out
}

const maximumGain = (s, x, y) => {
  let parts = s.split(/[^ab]/).filter(x => x.length > 1).map(word => findScore(word, x, y));
  return parts.reduce((a, c) => a + c, 0)
}

const tests = [
  { args: ["cdbcbbaaabab", 4, 5], out: 19 },
  { args: ["aabbaaxybbaabb", 5, 4], out: 20 },
  {
    args: [
      "aabbrtababbabmaaaeaabeawmvaataabnaabbaaaybbbaabbabbbjpjaabbtabbxaaavsmmnblbbabaeuasvababjbbabbabbasxbbtgbrbbajeabbbfbarbagha", 8484, 4096], 
      out: 198644
  },
];

tests.forEach((t, i) => {
  let res = maximumGain(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});