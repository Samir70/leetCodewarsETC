const mergeIntervals = (arr) => {
    const sorted = [...arr].sort((a, b) => a[0] - b[0]);
    const merged = [];
    var baseInterval = sorted[0];
    var comparePointer = 1;
    while (sorted[comparePointer] !== undefined) {
        if (sorted[comparePointer][0] > baseInterval[1]) {
            merged.push(baseInterval);
            baseInterval = sorted[comparePointer];
        } else {
            if (sorted[comparePointer][1] > baseInterval[1]) {
                baseInterval[1] = sorted[comparePointer][1]
            }
        }
        comparePointer++
    }
    merged.push(baseInterval)
    return merged
}

// makes intervals in order, so sort is not needed as first stage. 
// But these could be shuffled
const makeIntervals = (n) => {
    const intervals = []
    var start = Math.floor(Math.random() * 20);
    for (var i = 0; i < n; i++) {
        var end = start + Math.floor(Math.random() * 15);
        intervals.push([start, end]);
        start = end + Math.floor(Math.random() * 5) - 2
    }
    return intervals
}

const tests = [...Array(2)].map(x => makeIntervals(6));

tests.forEach(t => {
    console.log(t);
    console.log('merges to', mergeIntervals(t))
});
