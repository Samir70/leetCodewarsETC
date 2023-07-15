/**
 * @param {number[][]} events
 * @param {number} k
 * @return {number}
 */
const maxFromPosOnwards = (prev, events, pos, k) => {
  if (pos >= events.length || k === 0) { return 0 }
  let key = [pos, k].join(',')
  if (prev[key] !== undefined) { return prev[key] }
  let nextEvent = pos + 1;
  while (nextEvent < events.length && events[nextEvent][0] <= events[pos][1]) { nextEvent++ }
  let attendPos = events[pos][2] + maxFromPosOnwards(prev, events, nextEvent, k - 1)
  let skipPos = maxFromPosOnwards(prev, events, pos + 1, k);
  prev[key] = Math.max(attendPos, skipPos)
  return prev[key]
}
const maxValue = (events, k) => {
  events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  return maxFromPosOnwards([], events, 0, k)
}

const tests = [
  { args: [[[1, 2, 4], [3, 4, 3], [2, 3, 1]], 2], out: 7 },
  { args: [[[1, 2, 4], [3, 4, 3], [2, 3, 10]], 2], out: 10 },
  { args: [[[1, 1, 1], [2, 2, 2], [3, 3, 3], [4, 4, 4]], 3], out: 9 },
];

tests.forEach((t, i) => {
  let res = maxValue(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});