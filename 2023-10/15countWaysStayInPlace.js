/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
let base = 10**9 + 7;
var numWays = function (steps, arrLen) {
  // let counter = 0;
  let hash = {}
  const dp = (stepsLeft, position) => {
    // counter++
    if (position < 0) { return 0 }
    if (position >= arrLen || position > stepsLeft) { return 0 }
    if (stepsLeft === 0) { return position === 0 ? 1 : 0 }
    let key = [stepsLeft, position].join(",");
    if (hash[key] !== undefined) { return hash[key] }
    hash[key] = dp(stepsLeft - 1, position) 
    hash[key] = (hash[key] + dp(stepsLeft - 1, position - 1)) % base
    hash[key] = (hash[key] + dp(stepsLeft - 1, position + 1)) % base
    return hash[key]
  }
  let ans = dp(steps, 0)
  // console.log({ counter })
  return ans
};

const tests = [
  { args: [3, 2], out: 4 },
  { args: [2, 4], out: 2 },
  { args: [4, 2], out: 8 },
  { args: [10, 250], out: 2188 },
  { args: [20, 250], out: 50852019 },
  { args: [50, 250], out: 852867642 },
  { args: [500, 500], out: 374847123 },
];

tests.forEach((t, i) => {
  let res = numWays(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});