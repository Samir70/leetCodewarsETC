/**
 * @param {number[][]} points
 * @return {number}
 */
var maxWidthOfVerticalArea = function (points) {
  points.sort((a, b) => a[0] - b[0])
  let widest = 0
  for (let i = 1; i < points.length; i++) {
    widest = Math.max(widest, points[i][0] - points[i - 1][0])
  }
  return widest
};

const tests = [
  { args: [[[8, 7], [9, 9], [7, 4], [9, 7]]], out: 1 },
  { args: [[[3, 100], [9, 330], [1, 330], [1, 334], [5, 3333], [8, 338]]], out: 3 },
];

tests.forEach((t, i) => {
  let res = maxWidthOfVerticalArea(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});