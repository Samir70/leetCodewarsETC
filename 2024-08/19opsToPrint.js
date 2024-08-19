/**
 * @param {number} n
 * @return {number}
 */
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]
var minSteps = function (n) {
  let factors = []
  let p = 0, num = n
  while (n > 1 && p < primes.length) {
    let prime = primes[p]
    if (n % prime === 0) {
      n /= prime
      factors.push(prime)
    } else {
      p++
    }
  }
  // console.log({ n, factors })
  factors.push(n === 1 ? 0 : n)
  return factors.reduce((a, v) => a + v)
};

const tests = [
  { args: [1], out: 0 },
  { args: [2], out: 2 },
  { args: [3], out: 3 },
  { args: [5], out: 5 },
  { args: [11], out: 11 },
  { args: [101], out: 101 },
  { args: [4], out: 4 },
  { args: [8], out: 6 },
  { args: [24], out: 9 },
  { args: [25], out: 10 },
  { args: [125], out: 15 },
  { args: [10], out: 7 },
  { args: [100], out: 14 },
  { args: [1000], out: 21 },
];

tests.forEach((t, i) => {
  let res = minSteps(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});