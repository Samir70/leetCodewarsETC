/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
/**
 * Find p pairs of indices of nums such that 
 * the maximum difference amongst all the pairs is minimized. 
 * Also, ensure no index appears more than once amongst the p pairs.
 */
const canPickNonConseq = (arr, threshold, n) => {
  let count = 0
  let i = 0
  while (i < arr.length) {
    if (arr[i] <= threshold) { count++; i++ }
    if (count >= n) { return true }
    i++
  }
  return false
}
var minimizeMax = function (nums, p) {
  if (nums.length === 0 || p === 0) { return 0 }
  let sorted = nums.sort((a, b) => a - b)
  let diffs = []
  for (let i = 1; i < sorted.length; i++) {
    diffs.push(sorted[i] - sorted[i - 1])
  }
  // console.log({ nums, sorted, diffs })
  let left = 0, right = Math.max(...diffs);
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2)
    let canFindPairs = canPickNonConseq(diffs, mid, p)
    if (canFindPairs) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
};

const tests = [
  { args: [[10, 1, 2, 7, 1, 3], 2], out: 1 },
  { args: [[10, 1, 2, 7, 1, 3], 3], out: 3 },
  { args: [[10, 1, 2, 7, 1, 3, 12], 3], out: 2 },
  { args: [[4, 2, 1, 2], 1], out: 0 },
  { args: [[4, 2, 1, 2], 0], out: 0 },
  { args: [[8, 9, 1, 5, 4, 3, 6, 4, 3, 7], 4], out: 1 }
];

tests.forEach((t, i) => {
  // if (i !== 5) { return }
  let res = minimizeMax(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});