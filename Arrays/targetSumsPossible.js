/**
 * @param {number[]} target
 * @return {boolean}
 */
var isPossible = function (target) {
    if (target.length === 1) { return target[0] === 1 }
    target.sort((a, b) => b - a)
    sum = target.reduce((acc, v) => acc + v, 0)
    while (target[0] !== 1) {
        let base = sum - target[0]
        if (target[0] < base) { return false }
        sum -= target[0]
        target[0] = base > 1 ? target[0] % base : 1
        sum += target[0]
        if (target[0] === 0) { return false }
        target.sort((a, b) => b - a)
        // console.log(target)
    }
    return true
};

const tests = [
    [9, 3, 5], [8, 13], [8, 21], [3, 8], [3, 41],
    [13, 10], [10, 62], [5, 3, 17, 31],
    [6, 6, 6, 6, 6, 6], [1], [4], [1, 1000000000], [1, 1, 1, 10],
    [1, 1, 1, 17, 5], [1, 1, 1, 17, 9]
];

const outs = [
    true, true, true, true, true, true, false,
    false, false, true, false, true, true, true, true
]

tests.forEach((t, i) => console.log(
    t, '==>', isPossible(t) === outs[i]
))