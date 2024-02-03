/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var maxSumAfterPartitioning = function (arr, k) {
  // let count = 0
  let memo = Array(arr.length).fill(false)
  /**
   * Using memo drops calls to helper from 1606 to 39 
   * for test 2 with arr.length = 10
   */
  const helper = (idx) => {
    // count++
    if (idx >= arr.length) { return 0 }
    if (memo[idx]) { return memo[idx] }
    let options = Array(k).fill(0)
    let subArrayMax = 0
    for (let offset = 0; offset < k; offset++) {
      if (idx + offset >= arr.length) { continue }
      subArrayMax = Math.max(subArrayMax, arr[idx + offset])
      options[offset] = subArrayMax * (offset + 1) + helper(idx + offset + 1)
    }
    // console.log({ idx, options })
    memo[idx] = Math.max(...options)
    return memo[idx]
  }
  const out = helper(0)
  // console.log({ helperCalls: count })
  return out
};

const tests = [
  { args: [[1, 15, 7, 9, 2, 5, 10], 3], out: 84 },
  { args: [[1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4], out: 83 },
  { args: [[1], 1], out: 1 },
];

tests.forEach((t, i) => {
  let res = maxSumAfterPartitioning(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});