/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} edges
 * @return {number}
 */
var maximumValueSum = function (nums, k, edges) {
  const initialSum = nums.reduce((a, c) => a + c, 0)
  let posDiffs = [], negDiffs = []
  for (let n of nums) {
    let diff = (n ^ k) - n
    // diff can't be 0, since k >= 1
    if (diff > 0) {
      posDiffs.push(diff)
    } else {
      negDiffs.push(diff)
    }
  }
  // console.log({ posDiffs, negDiffs, initialSum })
  if (posDiffs.length % 2 === 0) {
    return initialSum + posDiffs.reduce((a, c) => a + c, 0)
  } else {
    posDiffs.sort((a, b) => a - b)
    negDiffs.sort((a, b) => b - a)
    // console.log({ posDiffs, negDiffs, initialSum })
    // start with all pos changes, except smallest
    let evenNumOfChanges = posDiffs.reduce((a, c) => a + c) - posDiffs[0]
    // nothing to pair least posDiff with
    if (negDiffs.length === 0) {
      return initialSum + evenNumOfChanges
    }
    // should we use the smallest positive change?
    let extraChange = Math.max(0, posDiffs[0] + negDiffs[0])
    return initialSum + evenNumOfChanges + extraChange
  }
};

const tests = [
  { args: [[1, 2, 1], 3, [[0, 1], [0, 2]]], out: 6 },
  { args: [[2, 3], 7, [[0, 1]]], out: 9 },
  { args: [[7, 7, 7, 7, 7, 7], 3, [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]]], out: 42 },
  { args: [[1, 7, 7, 7, 1], 3, [[0, 1], [0, 2], [0, 3], [0, 4]]], out: 25 },
  { args: [[1, 4, 4, 4, 1], 3, [[0, 1], [0, 2], [0, 3], [0, 4]]], out: 24 },
  { args: [[1, 7, 7, 7, 2], 3, [[0, 1], [0, 2], [0, 3], [0, 4]]], out: 24 },
  { args: [[4, 7, 7, 7, 2], 3, [[0, 1], [0, 2], [0, 3], [0, 4]]], out: 29 },
];

tests.forEach((t, i) => {
  let res = maximumValueSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});