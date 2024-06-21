/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 */
var maxSatisfied = function (customers, grumpy, minutes) {
  let mayNotSatisfy = [[0, -1]], posNotSat = 0, satisified = 0
  for (let i = 0; i < grumpy.length; i++) {
    if (grumpy[i]) {
      posNotSat += customers[i]
      mayNotSatisfy.push([posNotSat, i])
    } else {
      satisified += customers[i]
    }
  }
  // console.log(mayNotSatisfy)
  let [extras, left, right] = [0, 1, 1]
  while (left < mayNotSatisfy.length) {
    while (right < mayNotSatisfy.length - 1
      && mayNotSatisfy[right + 1][1] - mayNotSatisfy[left][1] < minutes) { right++ }
    extras = Math.max(extras, mayNotSatisfy[right][0] - mayNotSatisfy[left - 1][0])
    // console.log({ left, right, extras })
    left++
  }
  return satisified + extras
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