/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLucky = function (s, k) {
  // console.log('a'.charCodeAt(0)) // 97
  let digits = [...s].map(c => c.charCodeAt(0) - 96).join('')
  let val = [...digits].map(Number).reduce((acc, v) => acc + v, 0)
  let reps = 1
  while (reps < k) {
    val = [..."" + val].map(Number).reduce((acc, v) => acc + v, 0)
    if (val < 10) { return val }
    reps++
  }
  return val
};

const tests = [
  { args: ["iiii", 1], out: 36 },
  { args: ["leetcode", 2], out: 6 },
  { args: ["zbax", 2], out: 8 },
];

tests.forEach((t, i) => {
  let res = getLucky(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});