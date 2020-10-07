var removeCoveredIntervalsOld = function (intervals) {
    let sorted = [...intervals].sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
    // console.log(sorted)
    let dropped = 0;
    let cur = sorted[0]
    let i = 1;
    while (i < sorted.length) {
        let next = sorted[i];
        if (/*cur[0] <= next[0] && */cur[1] >= next[1]) {
            dropped++;
            // anything covered by next is covered by cur, so don't worry about next any more
        } else {
            if (cur[1] < next[1]) {
                cur = next
                // after [a, b] every interval starts with at least a
                // we only need to compare to the interval that ends latest
            }
        }
        i++
    }
    return sorted.length - dropped
};

// stripped off useless things, runs faster:
// don't copy the input, only use last part of interval, changed if ... else
// there is a version without the if.. else, only an if.
const removeCoveredIntervals = intervals => {
    intervals.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
    let dropped = 0;
    let curEnd = intervals[0][1]
    let i = 1;
    while (i < intervals.length) {
        let nextEnd = intervals[i][1];
        if (curEnd < nextEnd) {
            curEnd = nextEnd
        } else {
            dropped++;
        }
        i++
    }
    return intervals.length - dropped
};



const tests = [
    { intervals: [[1, 4], [3, 6], [2, 8]], out: 2 },
    { intervals: [[1, 4], [2, 3]], out: 1 },
    { intervals: [[0, 10], [5, 12]], out: 2 },
    { intervals: [[3, 10], [4, 10], [5, 11]], out: 2 },
    { intervals: [[1, 2], [1, 4], [3, 4]], out: 1 }
];

tests.forEach((t, i) => console.log(
    'test', i, removeCoveredIntervals(t.intervals) === t.out
))