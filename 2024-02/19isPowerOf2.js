/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  const countBits = (n) => n === 0 ? 0 : 1 + countBits(n & (n - 1));
  return n < 0 ? false : countBits(n) === 1
};

var isPowerOfTwo = function (n) {
  if (n <= 0) { return false }
  let otherOnes = n & (n - 1)
  return otherOnes === 0
};

var isPowerOfTwo = function (n) {
  return n > 0 && !(n & (n - 1))
};