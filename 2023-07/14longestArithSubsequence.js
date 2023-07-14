/**
 * @param {number[]} arr
 * @param {number} difference
 * @return {number}
 */
var longestSubsequence = function (arr, difference) {
  let maxLen = 1, longestEndingWith = {}
  for (let n of arr) {
    let prev = n - difference
    if (longestEndingWith[prev] === undefined) {
      longestEndingWith[n] = 1
    } else {
      longestEndingWith[n] = longestEndingWith[prev] + 1
      maxLen = Math.max(maxLen, longestEndingWith[n])
    }
  }
  return maxLen
};

const tests = [
  { args: [[1, 2, 3, 4], 1], out: 4 },
  { args: [[1, 3, 5, 7], 1], out: 1 },
  { args: [[1, 5, 7, 8, 5, 3, 4, 2, 1], -2], out: 4 },
];

tests.forEach((t, i) => {
  let res = longestSubsequence(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});