/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
// 73 ms
var insert = function (intervals, newInterval) {
  let n = intervals.length, i = 0;
  let out = []
  while (i < n && intervals[i][1] < newInterval[0]) {
    out.push(intervals[i++])
  }
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0])
    newInterval[1] = Math.max(newInterval[1], intervals[i][1])
    i++
  }
  out.push(newInterval)
  while (i < n) {
    out.push(intervals[i++])
  }
  return out
};
// 72 and 82ms
// var insert = function (intervals, newInterval) {
//   intervals.push(newInterval)
//   intervals.sort((a, b) => a[0] - b[0])
//   let cur = intervals[0]
//   let out = []
//   for (let i = 1; i < intervals.length; i++) {
//     let [start, end] = intervals[i]
//     if (start > cur[1]) {
//       out.push(cur)
//       cur = [start, end]
//     } else {
//       cur[1] = Math.max(cur[1], end)
//     }
//     // console.log({start, end, cur, out})
//   }
//   out.push(cur)
//   return out
// };

const tests = [
  { args: [[[1, 3], [6, 9]], [2, 5]], out: [[1, 5], [6, 9]] },
  { args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], out: [[1, 2], [3, 10], [12, 16]] },
];

tests.forEach((t, i) => {
  let res = insert(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});