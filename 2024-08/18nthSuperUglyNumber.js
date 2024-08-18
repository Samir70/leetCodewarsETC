/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
var nthSuperUglyNumber = function (n, primes) {
  let uglyList = [1];
  let pointers = Array(primes.length).fill(0)
  while (uglyList.length < n) {
    let lastUgly = uglyList[uglyList.length - 1];
    let newUglies = pointers.map((p, i) => uglyList[p] * primes[i])
    for (let i = 0; i < primes.length; i++) {
      if (newUglies[i] <= lastUgly) {
        pointers[i]++
        newUglies[i] = uglyList[pointers[i]] * primes[i]
      }
    }
    let nextUgly = Math.min(...newUglies)
    // console.log({ nextUgly, pointers, newUglies })
    uglyList.push(nextUgly)
  }
  return uglyList[n - 1]
};

const tests = [
  { args: [12, [2, 7, 13, 19]], out: 32 },
  { args: [124, [2, 7, 13, 19]], out: 10816 },
  { args: [124, [2, 7, 13, 19, 41]], out: 5248 },
  { args: [1240, [2, 7, 13, 19, 41]], out: 17998016 },
  { args: [1, [2, 3, 5]], out: 1 },
  { args: [1690, [2, 3, 5]], out: 2123366400 },
];

tests.forEach((t, i) => {
  let res = nthSuperUglyNumber(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});