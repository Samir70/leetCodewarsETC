var advantageCount = function (A, B) {
    let sA = [...A].sort((a, b) => a - b);
    let sB = [...B].sort((a, b) => a - b);
    let [i, j] = [0, 0];
    let unused = [];
    let pairs = {}
    console.log(sA.join(','), sB+'')
    while (i < A.length && j < B.length) {
        if (sA[i] > sB[j]) {
            if (pairs[sB[j]] === undefined) { pairs[sB[j]] = [] }
            pairs[sB[j]].push(sA[i])
            i++; j++;
        } else {
            unused.push(sA[i]);
            i++
        }
    }
    console.log(pairs, unused)
    let out = []
    for (let b of B) {
        if (pairs[b] && pairs[b].length) {
            out.push(pairs[b].pop())
        } else {
            out.push(unused.pop())
        }
    }
    return out
};

const tests = [
    // { A: [2, 0, 4, 1, 2], B: [1, 3, 0, 0, 2], out: [2, 0, 2, 1, 4] },
    // { A: [2, 7, 11, 15], B: [1, 10, 4, 11], out: [2, 11, 7, 15] },
    // { A: [12, 24, 8, 32], B: [13, 25, 32, 11], out: [24, 32, 8, 12] },
    // { A: [1, 2, 3, 4, 5], B: [6, 7, 8, 9, 10], out: [5, 4, 3, 2, 1] },
    {
        A: [28, 47, 45, 8, 2, 10, 25, 35, 43, 37, 33, 30, 33, 20, 33, 42, 43, 36, 34, 3, 16, 23, 15, 10, 19, 42, 13, 47, 0, 21, 36, 38, 0, 5, 3, 28, 4, 20, 14, 5, 19, 22, 29, 17, 3, 16, 35, 0, 26, 0],
        B: [44, 10, 27, 4, 27, 40, 46, 40, 45, 0, 41, 2, 44, 50, 36, 30, 37, 4, 44, 4, 12, 13, 35, 20, 19, 25, 38, 42, 43, 14, 2, 4, 5, 38, 4, 38, 0, 35, 12, 32, 38, 33, 3, 1, 19, 46, 23, 13, 24, 41]
    }
];

tests.forEach((t, i) => console.log(
    'test', i, advantageCount(t.A, t.B)
))