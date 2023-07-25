/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
  const isPeak = i => arr[i - 1] < arr[i] && arr[i + 1] < arr[i];
  let left = 0, right = arr.length - 1;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    // console.log(left, mid, right)
    if (isPeak(mid)) { return mid }
    if (arr[mid - 1] < arr[mid]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
};

const tests = [
  { args: [[0, 1, 0]], out: 1 },
  { args: [[0, 2, 1, 0]], out: 1 },
  { args: [[0, 10, 5, 2]], out: 1 },
  { args: [[1, 4, 5, 6, 7, 8, 9, 7, 6, 3]], out: 6 },
];

tests.forEach((t, i) => {
  let res = peakIndexInMountainArray(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});