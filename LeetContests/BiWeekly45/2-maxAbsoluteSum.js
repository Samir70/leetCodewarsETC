var maxAbsoluteSumOld = function (nums) {
    let mostNeg = 0, mostPos = 0;
    let maxAbs = 0;
    for (let n of nums) {
        mostNeg = Math.min(mostNeg + n, n, 0)
        mostPos = Math.max(mostPos + n, n, 0)
        // console.log(n, mostNeg, mostPos)
        maxAbs = Math.max(maxAbs, mostPos, -mostNeg)
    }
    return maxAbs
};

// via lee215
var maxAbsoluteSum = function (nums) {
    let min = 0, max = 0;
    let sum = 0;
    for (let n of nums) {
        sum += n;
        min = Math.min(min, sum)
        max = Math.max(max, sum)
    }
    return max - min
};

/**
 * Suppose:
sum[0...a] is maximum, and it's value >= 0, because initial ma_sum = 0 and always takes max
sum[0...b] is minimum, and it's value <= 0, because initial mi_sum = 0 and always takes min 


case 1: a is before b
[0,1,2,...a...b...end]

the sum [0...b] can be even smaller if it can exclude the sum from range [0...a]
so the largest different = abs(sum[0...b] - sum[0...a])


case 2: b is before a

[0,1,2,...b...a...end]
the sum [0...a] can be even greater if it can exclude the sum from range [0...b]
so the largest different = abs(sum[0...a] - sum[0...b])

 */

const tests = [
    { nums: [1, -3, 2, 3, -4], out: 5 },
    { nums: [-10, 1, -3, 2, 3, -4], out: 12 },
    { nums: [2, -5, 1, -4, 3, -2], out: 8 }
];

tests.forEach((t, i) => console.log(
    'test', i, maxAbsoluteSum(t.nums) //=== t.out
))