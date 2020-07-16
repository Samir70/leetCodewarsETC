const hIndex = citations => {
    if (citations[citations.length - 1] === 0) {return 0}
    var i = Math.floor(citations.length / 2) // the index we are looking for
    // elements up to index i must have value <= ans
    var posAns = citations.length - i
    // this many elements at and after index i must have value >= ans
    var minI = 0;
    while (citations[i] < posAns || citations[i - 1] > posAns) {
        console.log(i, 'posAns', posAns)
        if (citations[i] < posAns) {
            minI = i;
            i += Math.floor((citations.length - i) / 2)
        } else {
            i -= Math.floor((i - minI) / 2) || 1
        }
        posAns = citations.length - i
    }
    return posAns
}

const tests = [
    { in: [0, 1, 3, 5, 6], out: 3 },
    { in: [1, 3, 5, 6], out: 3 },
    { in: [3, 5, 6], out: 3 },
    { in: [0, 1, 3, 3, 3, 3, 5, 6], out: 3 },
    { in: [0, 1, 3, 3, 3, 3, 4, 5, 6, 10, 15], out: 4 },

    { in: [6, 6, 6, 6, 6, 6], out: 6 },
    { in: [0, 0, 0, 0, 0, 1], out: 1 },
    { in: [0, 0, 0, 0, 0, 0, 1], out: 1 },
    { in: [0, 0, 0, 0], out: 0 },
    { in: [1, 1, 2, 3, 4, 5, 7], out:3}
];

tests.forEach((t, i) => console.log(
    'test', i, '::', hIndex(t.in) === t.out
))