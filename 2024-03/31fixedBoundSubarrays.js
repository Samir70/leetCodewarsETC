/**
 * @param {number[]} nums
 * @param {number} minK
 * @param {number} maxK
 * @return {number}
 */
var countSubarrays = function (nums, minK, maxK) {
  let noOutsList = []
  let noOuts = []
  for (let n of nums) {
    if (minK <= n && n <= maxK) {
      noOuts.push(n)
    } else {
      if (noOuts.length > 0) { noOutsList.push(noOuts) }
      noOuts = []
    }
  }
  if (noOuts.length > 0) { noOutsList.push(noOuts) }
  // console.log(noOutsList)
  const countGoodSubarrays = arr => {
    let [min, max] = [Infinity, -Infinity]
    let [lastMin, lastMax] = [null, null]
    let right = 0, count = 0
    while (right < arr.length) {
      let n = arr[right]
      min = Math.min(min, n)
      max = Math.max(max, n)
      if (n === minK) { lastMin = right }
      if (n === maxK) { lastMax = right }
      if (min === minK && max === maxK) {
        count += Math.min(lastMin, lastMax) + 1
      }
      right++
    }
    return count
  }
  let counts = noOutsList.map(countGoodSubarrays)
  // console.log(counts)
  return counts.reduce((a, v) => a + v, 0)
};

const tests = [
  { args: [[1, 3, 5, 2, 7, 5], 1, 5], out: 2 },
  { args: [[1, 3, 1, 5, 2, 7, 5], 1, 5], out: 6 },
  { args: [[3, 4, 5, 1, 3, 1, 5, 2, 7, 5], 1, 5], out: 21 },
  { args: [[3, 4, 1, 5, 2, 3, 1, 5, 2, 7, 5], 2, 5], out: 3 },
  { args: [[1, 1, 1, 1], 1, 1], out: 10 },
  { args: [[11, 11, 11, 11], 1, 1], out: 0 },
];

tests.forEach((t, i) => {
  let res = countSubarrays(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});