/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function (n) {
  let count = 0
  while (n > 1) {
    if (n % 2) {
      count += (n - 1)/2 
      n = 1 + (n - 1)/2
    } else {
      count += n / 2
      n = n / 2
    }
  }
  return count
};

const tests = [
  { args: [7], out: 6 },
  { args: [14], out: 13 },
];

tests.forEach((t, i) => {
  let res = numberOfMatches(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});