/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
var mostBooked = function (n, meetings) {
  const availableFrom = Array(n).fill(0)
  const findFirstAvailable = t => {
    let minTime = Infinity, minRoom = null
    for (let r = 0; r < n; r++) {
      // console.log({ availableFrom, t })
      if (t >= availableFrom[r]) { return r }
      if (availableFrom[r] < minTime) {
        minTime = availableFrom[r]
        minRoom = r
      }
    }
    return minRoom
  }
  const meetingCount = Array(n).fill(0)
  meetings.sort((a, b) => a[0] - b[0])
  // console.log(meetings)
  for (let [start, end] of meetings) {
    let duration = end - start
    let room = findFirstAvailable(start)
    let actualStart = Math.max(availableFrom[room], start)
    meetingCount[room]++
    // console.log({ start, end, room, availableFrom: availableFrom[room] })
    availableFrom[room] = actualStart + duration
  }
  // console.log({ meetingCount })
  let max = 0, maxRoom = 0
  for (let r = 0; r < n; r++) {
    if (meetingCount[r] > max) {
      max = meetingCount[r]
      maxRoom = r
    }
  }
  return maxRoom
};

const tests = [
  { args: [2, [[0, 10], [1, 5], [2, 7], [3, 4]]], out: 0 },
  { args: [2, [[0, 10], [1, 5], [5, 7], [3, 4]]], out: 1 },
  { args: [3, [[1, 20], [2, 10], [3, 5], [4, 9], [6, 8]]], out: 1 },
  { args: [4, [[18, 19], [3, 12], [17, 19], [2, 13], [7, 10]]], out: 0 },
];

tests.forEach((t, i) => {
  let res = mostBooked(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});