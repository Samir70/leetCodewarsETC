/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function (arr) {
  if (arr.length === 1) { return arr[0] }
  let left = 0, right = Math.floor(arr.length / 4)
  while (right < arr.length) {
    if (arr[left] === arr[right]) { return arr[left] }
    right++
    left++
  }
  return -1
};

const tests = [
  { args: [[1, 2, 2, 6, 6, 6, 6, 7, 10]], out: 6 },
  { args: [[1, 1]], out: 1 },
  { args: [[1]], out: 1 },
  { args: [[1, 2, 3, 3]], out: 3 },
];

tests.forEach((t, i) => {
  let res = findSpecialInteger(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});