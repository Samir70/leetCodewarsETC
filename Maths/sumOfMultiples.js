/**
 * @param {number} n
 * @return {number}
 */
// 72ms
var sumOfMultiples357Brute = function (n) {
  let out = 0
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 || i % 5 === 0 || i % 7 === 0) { out += i }
  }
  return out
};

var sumOfMultiplesOfk = (n, k) => {
  if (k > n) { return 0 }
  let last = n - (n % k)
  return ((Math.floor(n / k))*(k + last))/2
}

// 67ms
var sumOfMultiples357 = function (n) {
  let sum3 = sumOfMultiplesOfk(n, 3)
  let sum5 = sumOfMultiplesOfk(n, 5)
  let sum7 = sumOfMultiplesOfk(n, 7)
  let sum15 = sumOfMultiplesOfk(n, 15)
  let sum21 = sumOfMultiplesOfk(n, 21)
  let sum35 = sumOfMultiplesOfk(n, 35)
  let sum105 = sumOfMultiplesOfk(n, 105)
  return sum3 + sum5 + sum7 - (sum15 + sum21 + sum35) + sum105
};

const tests = [7, 80, 55, 1000]

tests.forEach((t, i) => {
  let res = sumOfMultiples357Brute(t);
  let res2 = sumOfMultiples357(t);
  if (res !== res2) {
    console.log(
      'test', i, 'should be', res, ' got ', res2
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});