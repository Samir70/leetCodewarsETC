/**
 * @param {number} n
 * @return {number}
 */
const base = 10 ** 9 + 7
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
    if (b % 2) { out = (out + a) % base }
    a = (a + a) % base;
    b = b >> 1
  }
  return out
}
const powerMod = (a, b) => {
  if (a === 1) { return 1 }
  if (b === 1) { return a }
  let out = 1;
  while (b > 0) {
    if (b % 2) { out = multMod(out, a) }
    a = multMod(a, a)
    b = b % 2 ? (b - 1) / 2 : b / 2
  }
  return out
}
/**
 * Not complete!
 */
var checkRecord = function (n) {
  const noAbsWith3Ls = days => {
    let out = 0
    let firstIdxOfTriple = 0
    while (firstIdxOfTriple + 2 < days) {
      out += powerMod(2, days - 3)
      out  = out % base
      firstIdxOfTriple++
    }
    return out
  }
  const countNoAbs = days => {
    let noAbs = powerMod(2, days) - noAbsWith3Ls(days)
    return noAbs >= 0 ? noAbs : noAbs + base
  }
  const noAbs = countNoAbs(n)
  let oneAbs = 0
  for (let abs = 1; abs <= n; abs++) {
    oneAbs += multMod(countNoAbs(abs - 1), countNoAbs(n - abs))
  }
  multMod(n, powerMod(2, n - 1))
  console.log({ n, noAbs, oneAbs })
  return noAbs + oneAbs
};

const tests = [
  { args: [1], out: 3 },
  { args: [2], out: 8 },
  { args: [3], out: 19 },
  { args: [4], out: 43 },
  { args: [5], out: 94 },
  { args: [6], out: 200 },
  { args: [7], out: 418 },
  { args: [8], out: 861 },
  { args: [9], out: 1753 },
  { args: [10101], out: 183236316 },
];

tests.forEach((t, i) => {
  let res = checkRecord(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});