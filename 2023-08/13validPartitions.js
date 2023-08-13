/**
 * @param {number[]} nums
 * @return {boolean}
 */
/**
 * Partitions are valid if they are 
 * - two the same, eg: [1, 1]
 * - three the same, eg: [1, 1, 1]
 * - three consecutive, eg: [1, 2, 3]
 */
var validPartition = function (nums) {
  const memo = {}
  let calls = 0
  const helper = (left, right) => {
    // console.log({ nums })
    if (right - left < 1) { return false }
    if (right - left === 1) { return nums[left] === nums[right] }
    if (right - left === 2) {
      return (nums[left] === nums[right - 1] && nums[right - 1] === nums[right]) ||
        (nums[left] === nums[right - 1] - 1 && nums[right - 1] === nums[right] - 1)
    }
    const key = [left, right].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    calls++
    let take2GivesValidPartition = helper(left, left + 1) && helper(left + 2, right)
    if (take2GivesValidPartition) {
      memo[key] = true
      return true
    }
    let take3GivesValidPartition = helper(left, left + 2) && helper(left + 3, right)
    memo[key] = take3GivesValidPartition
    return take3GivesValidPartition
  }
  out = helper(0, nums.length - 1)
  console.log({ calls })
  return out
};

const { bigValidPartitionTest } = require('./testcase13');
const tests = [
  { args: [[4, 4, 4, 5, 6]], out: true },
  { args: [[1, 1, 1, 2]], out: false },
  { args: [[1, 2, 3]], out: true },
  { args: [[1, 1]], out: true },
  { args: [[1, 1, 1]], out: true },
  { args: [bigValidPartitionTest], out: false },
  { args: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], out: true },
];

tests.forEach((t, i) => {
  let res = validPartition(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});