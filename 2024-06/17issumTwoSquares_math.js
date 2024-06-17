const primeDecomp = n => {
  const lim = Math.floor(Math.sqrt(n))
  var ints = Array(lim).fill(true);
  var p = 2;
  var m = n;
  var factors = []
  while (p < Math.sqrt(m)) {
    while (m % p === 0) {
      m /= p
      factors.push(p);
    }
    var i = 2;
    // console.log({ p, m })
    while (i * p < Math.sqrt(m)) {
      ints[i * p] = false;
      i++
    }
    p++;
    // console.log({ p, m, ints })
    while (ints[p] !== undefined && !ints[p]) { p++ }
  }
  factors.push(m)
  return factors
}

/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
  let factors = primeDecomp(c)
  // console.log(factors)
  let tally = {}
  for (let p of factors) {
    if (p % 4 === 3) {
      tally[p] = (tally[p] || 0) + 1
    }
  }
  // console.log(tally)
  for (let p of Object.keys(tally)) {
    if (tally[p] % 2) { return false }
  }
  return true
};

const tests = [
  { args: [5], out: true },
  { args: [3], out: false },
  { args: [123456789], out: false },
];

tests.forEach((t, i) => {
  let res = judgeSquareSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});