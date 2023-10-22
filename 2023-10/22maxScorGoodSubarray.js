/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// now gets 92% and 100%
var maximumScore = function (nums, k) {
  let maxScore = nums[k];
  let minElement = nums[k], i = k, j = k;
  while (i > 0 || j < nums.length - 1) {
    let left = i > 0 ? nums[i - 1] : -Infinity
    let right = j < nums.length - 1 ? nums[j + 1] : -Infinity
    // console.log({ i, j, left, right, minElement })
    // left and right can't both be infinity
    if (left > right) {
      i--;
      minElement = Math.min(minElement, left)
    } else {
      j++;
      minElement = Math.min(minElement, right)
    }
    let subArraySize = j - i + 1;
    maxScore = Math.max(maxScore, minElement * subArraySize)
  }
  return maxScore
};

// let mountainArray = [];
// let n = 1;
// while (n < 20000) { mountainArray.push(n++) }
// while (n > 0) (mountainArray.push(n--))
// // console.log(mountainArray)

// const fs = require('fs')
// fs.writeFileSync('22bigtest.js', JSON.stringify(mountainArray))

const { bigTest, bigTest2, mountainArray } = require('./22bigtest');

const tests = [
  { args: [[1, 4, 3, 7, 4, 5], 3], out: 15 },
  { args: [[5, 5, 4, 5, 4, 1, 1, 1], 0], out: 20 },
  { args: [bigTest, 20000], out: 50000 },
  { args: [bigTest2, 44424], out: 96844 },
  { args: [mountainArray, 18765], out: 200010000 },
  { args: [[6569, 9667, 3148, 7698, 1622, 2194, 793, 9041, 1670, 1872], 5], out: 9732 },
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = maximumScore(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});