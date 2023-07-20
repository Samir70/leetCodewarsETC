var eraseOverlapIntervals = function (intervals) {
    let sorted = [...intervals].sort((a, b) =>
        a[1] === b[1] ? b[0] - a[0] : a[1] - b[1]
    );
    // console.log(sorted)
    let endTime = -Infinity;
    let needToErase = 0;
    for (let i of sorted) {
        if (endTime > i[0]) {
            needToErase++
        } else {
            endTime = i[1]
        }
    }
    return needToErase
};

const tests = [
    { in: [[1, 2], [1, 3], [3, 4], [2, 3]], out: 1 }, // delete [1,3]
    { in: [[1, 2], [1, 2], [1, 2]], out: 2 },
    { in: [[1, 2], [2, 3]], out: 0 },
    { in: [[1, 2], [2, 3], [3, 4], [-100, 3], [5, 7]], out: 1 }
];

tests.forEach((t, i) => console.log(
    'test', i, eraseOverlapIntervals(t.in), 'should be', t.out
))