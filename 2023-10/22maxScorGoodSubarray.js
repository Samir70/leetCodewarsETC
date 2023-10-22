/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumScore = function (nums, k) {
  let minElement = nums[k];
  let minsToLeftAndRight = Array(nums.length)
  let i = k;
  while (i >= 0) {
    minElement = Math.min(minElement, nums[i]);
    minsToLeftAndRight[i] = minElement;
    i--;
  }
  let j = k + 1;
  minElement = nums[k];
  while (j < nums.length) {
    minElement = Math.min(minElement, nums[j]);
    minsToLeftAndRight[j] = minElement;
    j++;
  }
  // console.log(minsToLeftAndRight)
  let maxScore = nums[k];
  minElement = nums[k], i = k, j = k;
  while (i > 0 || j < nums.length - 1) {
    let left = i > 0 ? minsToLeftAndRight[i - 1] : -Infinity
    let right = j < nums.length - 1 ? minsToLeftAndRight[j + 1] : -Infinity
    // console.log({ i, j, left, right, minElement })
    // if (left === -Infinity && right === -Infinity) { break }
    if (left > right) {
      i > 0 ? i-- : j++
      minElement = Math.min(minElement, left)
    } else {
      j < nums.length - 1 ? j++ : i--
      minElement = Math.min(minElement, right)
    }
    let subArraySize = j - i + 1;
    minElement = Math.min(minsToLeftAndRight[i], minsToLeftAndRight[j])
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