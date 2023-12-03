/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function (points) {
  let cur = points[0];
  let time = 0;
  for (let i = 1; i < points.length; i++) {
    let dx = points[i][0] - cur[0];
    let dy = points[i][1] - cur[1];
    if (dx < 0) { dx = -dx }
    if (dy < 0) { dy = -dy }
    time += Math.max(dx, dy)
    cur = points[i]
  }
  return time
};

const tests = [
  { args: [[[1, 1], [3, 4], [-1, 0]]], out: 7 },
  { args: [[[3, 2], [-2, 2]]], out: 5 },
];

tests.forEach((t, i) => {
  let res = minTimeToVisitAllPoints(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});