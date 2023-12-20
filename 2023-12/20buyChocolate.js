/**
 * @param {number[]} prices
 * @param {number} money
 * @return {number}
 */
var buyChoco = function (prices, money) {
  let a = Infinity, b = Infinity
  for (let p of prices) {
    if (p <= a) {
      b = a;
      a = p;
    } else if (p <= b) {
      b = p
    }
  }
  return a + b <= money ? money - (a + b) : money
};
// var buyChoco = function (prices, money) {
//   [cheap, cheapish] = prices.sort((a, b) => a - b)
//   return cheap + cheapish <= money ? money - cheap - cheapish : money
// };

tests = [
  { args: [[1, 2, 2], 3], out: 0 },
  { args: [[3, 1, 3], 3], out: 3 },
  { args: [[3, 1, 1], 3], out: 1 },
];

tests.forEach((t, i) => {
  let res = buyChoco(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});