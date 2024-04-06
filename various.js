/**
 * @param {number} x
 * @return {number}
 */
// https://leetcode.com/problems/sqrtx/
var mySqrt = function (x) {
  let left = 0, right = x;
  while (left < right) {
    let mid = left + Math.ceil((right - left) / 2)
    if (mid * mid > x) {
      // ans is in [left, mid)
      right = mid - 1
    } else {
      left = mid
    }
  }
  return left
};


/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 * https://leetcode.com/problems/add-two-promises/
 */
var addTwoPromises = async function (promise1, promise2) {
  out = await Promise.all([promise1, promise2]).then(vals => {
    return vals[0] + vals[1]
  })
  return out
};

/**
 * @param {string[]} operations
 * @return {number}
 * https://leetcode.com/problems/final-value-of-variable-after-performing-operations/
 */
var finalValueAfterOperations = function (operations) {
  out = 0
  for (let op of operations) {
    out += op.indexOf("+") > -1 ? 1 : -1
  }
  return out
};
var finalValueAfterOperations = function (operations) {
  return operations.map(op => op.indexOf("+") === -1 ? -1 : 1)
    .reduce((a, c) => a + c, 0)
};



/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 * https://leetcode.com/problems/divisible-and-non-divisible-sums-difference/
 */
var differenceOfSums = function (n, m) {
  let [divSum, notDivSum] = [0, 0]
  for (let i = 1; i <= n; i++) {
    i % m === 0 ? divSum += i : notDivSum += i
  }
  return notDivSum - divSum
};
/**
 * Beats nearly everybody:
 */
var differenceOfSums = function (n, m) {
  if (m >= n) {
    return m > n ? n * (n + 1) / 2 : n * (n - 3) / 2
  }
  if (m === 1) { return -n * (n + 1) / 2 }
  let t = (Math.floor(n / m))
  // t elements of m times table sum to m * Tri(t)
  // 2 * m * t(t + 1) / 2 = m * t(t + 1)
  return (n * (n + 1) / 2) - (m * t * (t + 1))
};
