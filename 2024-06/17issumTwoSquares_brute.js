/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
  let [left, right] = [0, Math.ceil(Math.sqrt(c))]
  while (left <= right) {
    let sum = left * left + right * right
    if (sum < c) {
      left++
    } else if (sum > c) {
      right--
    } else {
      return true
    }
  }
  return false
};

const tests = [
  { args: [5], out: true },
  { args: [2], out: true },
  { args: [3], out: false },
  { args: [123456789], out: false },
];

tests.forEach((t, i) => {
  let res = judgeSquareSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});