/**
 * @param {number[]} prices
 * @param {number} money
 * @return {number}
 */
var buyChoco = function (prices, money) {
  [cheap, cheapish] = prices.sort((a, b) => a - b)
  return cheap + cheapish <= money ? money - cheap - cheapish : money
};

tests = [
  { args: [[1, 2, 2], 3], out: 0 },
  { args: [[3, 1, 3], 3], out: 3 },
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