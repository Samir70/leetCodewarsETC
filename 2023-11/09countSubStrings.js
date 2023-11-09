/**
 * @param {string} s
 * @return {number}
 */
const base = 10 ** 9 + 7;
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
    if (b % 2) { out = (out + a) % base }
    a = (a + a) % base;
    b = b >> 1
  }
  return out
}
var countHomogenous = function (s) {
  const homogenous = s.match(/(\w)\1*/g)
  // console.log(homogenous)
  let out = 0;
  for (let h of homogenous) {
    let len = h.length
    out += len % 2 ? multMod(len, (len + 1) / 2) : multMod(len / 2, len + 1)
    out %= base
  }
  return out
};

const tests = [
  { args: ["abbcccaa"], out: 13 },
  { args: ["xy"], out: 2 },
  { args: ["zzzzz"], out: 15 },
];

tests.forEach((t, i) => {
  let res = countHomogenous(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});