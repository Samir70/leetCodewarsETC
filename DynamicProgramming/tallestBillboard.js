/**
 * @param {number[]} rods
 * @return {number}
 */
// See also the DP version here: 
// https://leetcode.com/problems/tallest-billboard/editorial/
const getDiffs = (nums) => {
  let states = [[0, 0]];
  for (let n of nums) {
    let newStates = []
    for (let s of states) {
      newStates.push([s[0], s[1]]);
      newStates.push([s[0] + n, s[1]]);
      newStates.push([s[0], s[1] + n]);
    }
    states = [...newStates]//newStates.concat(newStates)
  }
  let diffs = {}
  for (let [left, right] of states) {
    if (diffs[left - right] === undefined) {
      diffs[left - right] = left
    } else {
      diffs[left - right] = Math.max(diffs[left - right], left)
    }
  }
  return diffs
}
var tallestBillboard = function (rods) {
  let maxHeight = 0;
  let n = rods.length;
  let splitAt = Math.floor(n / 2)
  let left = rods.slice(0, splitAt), right = rods.slice(splitAt);
  // console.log(left, right);
  let leftdiffs = getDiffs(left)
  let rightdiffs = getDiffs(right)
  // console.log(leftdiffs, rightdiffs)
  for (let diff in leftdiffs) {
    let d = Number(diff)
    let oppDiff = (-d).toString()
    if (rightdiffs[oppDiff]) {
      maxHeight = Math.max(maxHeight, leftdiffs[diff] + rightdiffs[oppDiff])
    }
  }
  return maxHeight
};

const tests = [
  { args: [[1, 2, 3, 6]], out: 6 },
  { args: [[1, 2, 3, 4, 5, 6]], out: 10 },
  { args: [[1, 2]], out: 0 },
  { args: [[1, 2, 3, 4, 5, 6, 8, 12, 45, 13, 15, 12, 56, 67, 45, 23, 34, 35, 16, 100]], out: 251 },
];

tests.forEach((t, i) => {
  let res = tallestBillboard(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});