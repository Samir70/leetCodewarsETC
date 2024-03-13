/**
 * @param {number} n
 * @return {number}
 */
// const sum1toN = n => n * (n + 1) / 2
// const sumXtoN = (x, n) => sum1toN(n) - sum1toN(x - 1)
// var pivotInteger = function (n) {
//   let triN = sum1toN(n)
//   // by algebra: output needs to be SQRT(triN)
//   let out = Math.sqrt(triN)
//   return Math.floor(out) !== out ? -1 : out
// };
// var pivotInteger = function (n) {
//   let sourceOfSqTriangles = {
//     1: 1, 8: 6, 49: 35, 288: 204, 1681: 1189
//   }
//   return sourceOfSqTriangles[n] === undefined ? -1 : sourceOfSqTriangles[n]
// };
var pivotInteger = function (n) {
  let total = n * (n + 1) / 2
  let sum1ToX = 0
  for (let x = 1; x <= n; x++) {
    if (sum1ToX + x === total - sum1ToX) { return x }
    sum1ToX += x
  }
  return -1
};

const tests = [
  { args: [1], out: 1 },
  { args: [8], out: 6 },
  { args: [49], out: 35 },
  { args: [288], out: 204 },
  { args: [1681], out: 1189 },
  { args: [4], out: -1 },
]
tests.forEach((t, i) => {
  let res = pivotInteger(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});