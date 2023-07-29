/**
 * @param {number} n
 * @return {number}
 */
var soupServings = function (n) {
  // Answer only requires 0.00001 accuracy. Could have got by with a limit of 200
  if (n > 5000) { return 1 }
  const memo = {}
  const helper = (a, b) => {
    if (a <= 0 && b <= 0) { return 0.5 }
    if (b <= 0) { return 0 }
    if (a <= 0) { return 1 }
    let key = [a, b].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let prob = 0
    prob += 0.25 * helper(a - 100, b)
    prob += 0.25 * helper(a - 75, b - 25)
    prob += 0.25 * helper(a - 50, b - 50)
    prob += 0.25 * helper(a - 25, b - 75)
    // console.log({ a, b, prob })
    memo[key] = prob
    return prob
  }
  return helper(n, n)
};

const tests = [
  { args: [50], out: 0.625 },
  { args: [100], out: 0.71875 },
  { args: [5000], out: 1 },
];

tests.forEach((t, i) => {
  let res = soupServings(...t.args);
  if (Math.abs(res - t.out) > 0.00001) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});