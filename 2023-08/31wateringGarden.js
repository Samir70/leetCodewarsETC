/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
  let intervals = [];
  for (let tap = 0; tap <= n; tap++) {
    intervals.push([Math.max(0, tap - ranges[tap]), Math.min(n, tap + ranges[tap])]);
  }
  intervals.sort((a, b) => a[0] - b[0])
  /**
   * We may be able to do without sorting by computing an array
   * max_reach[i] = the maximum end over all taps having start=i 
   */
  // console.log(intervals)
  let intervalCount = 0, start = 0, end = 0;
  let i = 0;
  while (i <= n) {
    if (intervals[i][0] > end) { return -1 }
    let bestEnd = end;
    while (i <= n && intervals[i][0] <= end) {
      bestEnd = Math.max(bestEnd, intervals[i][1])
      i++;
    }
    if (bestEnd > end) {
      end = bestEnd;
      intervalCount++
      // console.log({ start: intervals[i - 1][0], bestEnd, i, end, intervalCount })
    }
  }
  return end >= n ? intervalCount : -1
};

const tests = [
  { args: [5, [3, 4, 1, 1, 0, 0]], out: 1 },
  { args: [5, [1, 1, 2, 1, 1, 0]], out: 2 },
  { args: [5, [3, 3, 1, 1, 0, 0]], out: -1 },
  { args: [9, [0, 5, 0, 3, 3, 3, 1, 4, 0, 4]], out: 2 },
  { args: [3, [0, 0, 0, 0]], out: -1 },
];

tests.forEach((t, i) => {
  // if (i !== 3) { return }
  let res = minTaps(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});