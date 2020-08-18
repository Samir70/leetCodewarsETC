var numsSameConsecDiff = function (n, k) {
    let out = [0,1,2,3,4,5,6,7,8,9];
    let len = 1
    while (len < n) {
        let newOut = [];
        for (var num of out) {
            if (num === 0) {continue}
            let lastDigit = num % 10
            let nextDigit = k === 0 ? [lastDigit] : [lastDigit - k, lastDigit+k]
            nextDigit.filter(x => x>=0 && x<10).forEach(x => newOut.push(Number(''+num+x)))
        }
        out = newOut;
        len++;
    }
    return out
};

const tests = [
    { n: 3, k: 7, out: [181, 292, 707, 818, 929] },
    { n: 2, k: 1, out: [10, 12, 21, 23, 32, 34, 43, 45, 54, 56, 65, 67, 76, 78, 87, 89, 98] },
    { n: 2, k: 0, out: [11,22,33,44,55,66,77,88,99] },
    { n: 1, k: 9, out: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }
];
tests.forEach((t, i) => console.log(
    'test', i, numsSameConsecDiff(t.n, t.k), 'should be', t.out
))