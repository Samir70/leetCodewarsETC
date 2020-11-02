// beats 64%
const maxDistToClosest1 = seats => {
    let maxGap = 0; //longest string of consec zeros
    let gapAtStart = 0, gapAtEnd = 0;
    let gapCount = 0, leftStart = false;
    for (let i = 0; i < seats.length; i++) {
        if (seats[i] === 0) {
            gapCount++
        } else {
            if (!leftStart) { gapAtStart = gapCount };
            maxGap = Math.max(maxGap, gapCount);
            gapCount = 0;
            leftStart = true;
        }
    }
    if (seats[seats.length - 1] === 0) { gapAtEnd = gapCount }
    return Math.max(Math.floor((maxGap + 1) / 2), gapAtEnd, gapAtStart)
}

// with two pointers was 4ms slower, beating 38%
const maxDistToClosest2 = seats => {
    let gapStart = 0;
    let sitAtFront = 0, sitAtEnd = 0, sitInMiddle = 0;
    while (gapStart < seats.length) {
        while (gapStart<seats.length && seats[gapStart] === 1) {gapStart++}
        let gapEnd = gapStart+1
        while (gapEnd < seats.length && seats[gapEnd] === 0) {gapEnd++}
        if (gapEnd === seats.length) {
            sitAtEnd = gapEnd - gapStart
        }
        if (gapStart === 0) {
            sitAtFront = gapEnd - gapStart
        }
        sitInMiddle = Math.max(Math.floor((1 + gapEnd - gapStart)/2), sitInMiddle)
        gapStart = gapEnd+1
    }
    return Math.max(sitAtFront, sitInMiddle, sitAtEnd)
}

// from https://leetcode.com/problems/maximize-distance-to-closest-person/discuss/137912/JavaC%2B%2BPython-One-pass-Easy-Understood
// translated from Python
// beats nearly 93%
const maxDistToClosest = seats => {
    let best = 0, n = seats.length, last = -1;
    for (let i = 0; i < n; i++) {
        if (seats[i] === 1) {
            best = last < 0 ? i : Math.max(best, Math.floor((i-last)/2));
            last = i
        }
    }
    return Math.max(best, n - last - 1)
}


const tests = [
    { seats: [1, 0, 0, 0, 1, 0, 1], out: 2 },
    { seats: [1, 0, 0, 0, 0, 1, 0, 1], out: 2 },
    { seats: [1, 0, 0, 0], out: 3 },
    { seats: [0, 1], out: 1 },
    { seats: [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], out: 4 }
];

tests.forEach((t, i) => console.log(
    'test', i, maxDistToClosest(t.seats) === t.out
))