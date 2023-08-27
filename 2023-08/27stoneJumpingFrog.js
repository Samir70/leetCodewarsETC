/**
 * @param {number[]} stones
 * @return {boolean}
 */
const binarySearch = (arr, start, val) => {
  let left = start, right = arr.length - 1
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2)
    if (arr[mid] === val) { return mid }
    if (arr[mid] < val) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return arr[left] === val ? left : -1
}
var canCross = function (stones) {
  // console.log(stones)
  let memo = {}
  const canFinishFrom = (i, location, jumpSize) => {
    if (jumpSize < 1) { return false }
    let key = [i, location, jumpSize].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let nextLocation = location + jumpSize
    let nextIndex = binarySearch(stones, i, nextLocation)
    // console.log({ i, location, jumpSize, nextLocation, nextIndex })
    // if (i % 100 === 0) { console.log({ i, location, jumpSize, nextLocation, nextIndex }) }
    if (nextIndex === -1) { return false }
    if (nextIndex === stones.length - 1) { return true }

    // Frog makes it to next stone can jump same or +/- 1 of jumpSize
    memo[key] = canFinishFrom(nextIndex, nextLocation, jumpSize - 1) ||
      canFinishFrom(nextIndex, nextLocation, jumpSize) ||
      canFinishFrom(nextIndex, nextLocation, jumpSize + 1)
    return memo[key]
  }
  return canFinishFrom(0, 0, 1)
};

const { bigArray } = require('./27bigArray')
const tests = [
  { args: [[0, 1, 3, 5, 6, 8, 12, 17]], out: true },
  { args: [[0, 2]], out: false },
  { args: [[0, 1, 2, 3, 4, 8, 9, 11]], out: false },
  { args: [bigArray], out: false },
];

tests.forEach((t, i) => {
  let res = canCross(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});