/**
 * @param {number} n
 * @return {number}
 * find max product of partition (at least two pieces)
 */
const integerBreak = n => {
  if (n < 4) {return n - 1}
  if (n % 3 === 0) {return 3 ** (n / 3)}
  if (n %3 === 1) {return 4 * (3 ** ((n - 4) / 3))}
  if (n %3 === 2) {return 2 * (3 ** ((n - 2) / 3))}
  return -1
}
// const integerBreak = n => {
//   if (n < 4) {return n - 1}
//   let ans = 1
//   while (n > 4) {
//     ans *= 3
//     n -= 3
//   }
//   return ans * n
// }
// var integerBreak = function (n) {
//   if (n == 2) { return 1 }
//   if (n == 3) { return 2 }
//   if (n % 3 === 0) { return 3 ** (n / 3) }
//   let numTwos = Math.floor(n / 2), b = n % 2
//   let numThrees = 0
//   while (numTwos > 3) {
//     numTwos -= 3;
//     numThrees += 2
//   }
//   if (b === 1 && numTwos > 0) {
//     numTwos--; numThrees++
//   }
//   // console.log({ n, numTwos, numThrees, sum: 2 * numTwos + 3 * numThrees + b })
//   return 3 ** numThrees * 2 ** numTwos
// };

/**
 for (i = 2; i < 20; i++) {
    target = 3 * i
    let [a, b] = [Math.floor(target / 5), target % 5 || 1]
    let asFives = 5 ** a
    if (b > 0) { asFives *= b }
    console.log({ target, asThrees: 3 ** i, asFives, isGreater: asFives > 3 ** i })
  }
 */

const tests = [
  { args: [2], out: 1 },
  { args: [3], out: 2 },
  { args: [9], out: 27 },
  { args: [10], out: 36 },
  { args: [12], out: 81 },
  { args: [15], out: 243 },
  { args: [21], out: 2187 },
  { args: [27], out: 19683 },
  { args: [39], out: 1594323 },
  { args: [51], out: 129140163 },
  { args: [55], out: 516560652 },
  { args: [57], out: 1162261467 },
  { args: [58], out: 1549681956 },
];

tests.forEach((t, i) => {
  let res = integerBreak(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const factorise = n => {
    let factors = []
    for (let p of primes) {
        let e = 0;
        while (n % p === 0) { n /= p; e++ }
        if (e > 0) { factors.push([p, e]) }
    }
    if (n > 1) { factors.push([n, 1]) }
    return factors
}

// console.log(factorise(516560652))