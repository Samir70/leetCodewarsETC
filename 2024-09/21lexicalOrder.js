/**
 * @param {number} n
 * @return {number[]}
 * n is less than 5*10^4
 */
var lexicalOrder = function (n) {
  let out = []
  let cur = 1
  for (let i = 1; i <= n; i++) {
    out.push(cur)
    if (cur * 10 <= n) {
      cur *= 10
    } else {
      while (cur % 10 === 9 || cur >= n) {
        cur = Math.floor(cur / 10)
      }
      cur++
    }
  }
  return out
};

const tests = [
  { args: [13], out: [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9] },
  { args: [2], out: [1, 2] },
];


const { compArrs } = require("../utilities/compareArrays")
tests.forEach((t, i) => {
  let res = lexicalOrder(...t.args);
  if (!compArrs(res, t.out)) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});