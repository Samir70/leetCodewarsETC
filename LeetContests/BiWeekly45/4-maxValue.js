/**
 * attend k events [start, end, val]
 */
let calls = 0
const maxFromPosOnwards = (prev, events, pos, k) => {
    if (pos >= events.length || k === 0) { return 0 }
    let key = [pos, k].join(',')
    if (prev[key] !== undefined) { return prev[key] }
    // console.log('working out', key); calls++
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
    { events: [[1, 2, 4], [3, 4, 3], [2, 3, 1]], k: 2, out: 7 },
    { events: [[1, 2, 4], [3, 4, 3], [2, 3, 10]], k: 2, out: 10 },
    { events: [[1, 1, 1], [2, 2, 2], [3, 3, 3], [4, 4, 4]], k: 3, out: 9 },
    { events: [[1, 3, 4], [2, 4, 1], [1, 1, 4], [3, 5, 1], [2, 5, 5]], k: 3, out: 9 }
];

tests.forEach((t, i) => console.log(
    'test', i, maxValue(t.events, t.k) === t.out || maxValue(t.events, t.k)
));
console.log(calls, 'calls')