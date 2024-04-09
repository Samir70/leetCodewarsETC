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
 * @param {number} n
 * @return {number}
 * https://leetcode.com/problems/smallest-even-multiple/
 */
// Go from 53 to 49ms
var smallestEvenMultiple = function (n) {
  // return n % 2 ? 2 * n : n
  return n % 2 ? n << 1 : n
};

/**
 * @param {number} num
 * @return {number}
 * https://leetcode.com/problems/minimum-sum-of-four-digit-number-after-splitting-digits/
 */
var minimumSum = function(num) {
  let digits = [...''+num].sort()
  return Number(digits[0] + digits[2]) + Number(digits[1] + digits[3])
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

/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 * https://leetcode.com/problems/maximum-repeating-substring/
 */
// binary search, gets beaten by brute force when input is limted to len 100
var maxRepeating = function (sequence, word) {
  let left = 0, right = Math.ceil(sequence.length / word.length)
  while (left < right) {
    let mid = Math.ceil((left + right) / 2)
    let long = Array(mid).fill(word).join("")
    if (sequence.includes(long)) {
      left = mid
    } else {
      right = mid - 1
    }
  }
  return left
};

/**
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 * https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i/
 */
// DP 61ms
var getLongestSubsequence = function (words, groups) {
  let longestEndingWith0 = groups[0] === 0 ? [words[0]] : []
  let longestEndingWith1 = groups[0] === 1 ? [words[0]] : []
  for (let i = 1; i < words.length; i++) {
    let [w, g] = [words[i], groups[i]]
    if (g === 0) {
      longestEndingWith0 = [...longestEndingWith1, w]
    } else {
      longestEndingWith1 = [...longestEndingWith0, w]
    }
  }
  return longestEndingWith0.length > longestEndingWith1.length ? longestEndingWith0 : longestEndingWith1
};

// Greedy 59ms
var getLongestSubsequence = function (words, groups) {
  let cur = groups[0]
  let out = [words[0]]
  for (let i = 1; i < words.length; i++) {
    if (groups[i] === cur) { continue }
    out.push(words[i])
    cur = groups[i]
  }
  return out
};
