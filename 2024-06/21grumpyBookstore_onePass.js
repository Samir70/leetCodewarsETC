/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 */
var maxSatisfied = function (customers, grumpy, minutes) {
  let [granted, extras] = [0, 0]
  let [left, right] = [0, 0]
  while (right < minutes) {
    grumpy[right] ? extras += customers[right] : granted += customers[right]
    right++
  }
  // console.log({ left, right, granted, extras })
  let maxExtras = extras
  while (right < grumpy.length) {
    if (grumpy[left]) { extras -= customers[left] }
    grumpy[right] ? extras += customers[right] : granted += customers[right]
    maxExtras = Math.max(maxExtras, extras)
    left++; 
    // console.log({ left, right, granted, maxExtras })
    right++
  }
  return granted + maxExtras
};

const tests = [
  { args: [[1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3], out: 16 },
  { args: [[1, 10, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3], out: 22 },
  { args: [[1], [0], 1], out: 1 },
  { args: [[1], [1], 1], out: 1 },
];

tests.forEach((t, i) => {
  let res = maxSatisfied(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});