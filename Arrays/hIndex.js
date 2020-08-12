var hIndex = function (citations) {
    var tally = Array(citations.length + 1).fill(0);
    for (var c of citations) {
        let toTally = Math.min(c, citations.length);
        tally[toTally]++
    }
    var sum = 0;
    var i = tally.length - 1;
    while (i > 0) {
        sum += tally[i];
        if (sum >= i) { return i }
        i--
    }
    return 0
};

const tests = [
    { in: [3, 0, 6, 1, 5], out: 3 },
    { in: [0, 0, 0, 0, 0], out: 0 },
    { in: [0, 0, 0, 1, 0], out: 1 },
    { in: [5, 5, 5, 4, 1, 1], out: 4 }
];
tests.forEach((t, i) => console.log(
    t.in, hIndex(t.in), 'should be', t.out
))