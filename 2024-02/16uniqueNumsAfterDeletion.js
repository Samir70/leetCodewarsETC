/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
  const tally = {}
  for (let n of arr) {
    tally[n] = (tally[n] || 0) + 1
  }
  let nums = Object.keys(tally).sort((a, b) => tally[a] - tally[b])
  // console.log({ tally, nums })
  let deleteCount = 0, unique = nums.length
  for (let i = 0; i < nums.length; i++) {
    if (deleteCount === k) { break }
    if (tally[nums[i]] <= k - deleteCount) {
      deleteCount += tally[nums[i]]
      unique--
    } else {
      break
    }
  }
  return unique
};

const tests = [
  { args: [[5, 5, 4], 1], out: 1 },
  { args: [[4, 3, 1, 1, 3, 3, 2], 3], out: 2 },
];

tests.forEach((t, i) => {
  let res = findLeastNumOfUniqueInts(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});