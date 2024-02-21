const rangeBitwiseAnd = (left, right) => {
  let count = 0;
  while (left && left !== right) {
    left >>= 1; right >>= 1
    count++
  }
  return left <<= count
}
// var rangeBitwiseAnd = function(left, right) {
//     let out = left
//     while (left <= right && out !== 0) {
//         out = out & left
//         left++
//     }
//     return out
// };

const tests = [
  { args: [5, 7], out: 4 },
  { args: [0, 0], out: 0 },
  { args: [1, 2147483647], out: 0 },
];

tests.forEach((t, i) => {
  let res = rangeBitwiseAnd(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});