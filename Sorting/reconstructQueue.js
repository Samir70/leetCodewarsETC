const reconstructQueue = people => {
    var sorted = [...people].sort((a, b) => a[0] - b[0]);
    var out = Array(people.length).fill([Infinity, 0]);
    for (var i = 0; i < people.length; i++) {
        var before = sorted[i][1];
        var count = 0, pos=0;
        while (count < before) {
            if (out[pos][0] >= sorted[i][0]) {count++}
            pos++
        }
        while (out[pos][0]<sorted[i][0]) {pos++}
        out[pos] = sorted[i]
    }
    return out
}

const tests = [
    { in: [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]], out: [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]] },
    { in: [[3, 0], [5, 0], [7, 0], [4, 2], [6, 1], [2, 5], [8, 0]], out: [[3, 0], [5, 0], [7, 0], [4, 2], [6, 1], [2, 5], [8, 0]]}
]

tests.forEach((t, i) => console.log('test', i, reconstructQueue(t.in), 'should be', t.out))

/**
 * 
    Pick out tallest group of people and sort them in a subarray (S). Since there's no other groups of people taller than them, therefore each guy's index will be just as same as his k value.
    For 2nd tallest group (and the rest), insert each one of them into (S) by k value. So on and so forth.

E.g.
input: [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
subarray after step 1: [[7,0], [7,1]]
subarray after step 2: [[7,0], [6,1], [7,1]]
 */