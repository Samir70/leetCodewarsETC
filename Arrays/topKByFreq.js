var topKFrequent = function (nums, k) {
    var tally = {}
    for (var n of nums) {
        if (tally[n] === undefined) { tally[n] = 0 }
        tally[n]++
    }
    var keys = Object.keys(tally);
    const quickselect = (arr, n) => {
        var pivot = arr[Math.floor(Math.random() * arr.length)];
        var left = [], right = [];
        for (var a of arr) {
            if (tally[a] < tally[pivot]) {
                left.push(a)
            } else {
                right.push(a)
            }
        }
        if (right.length === n) {return right}
        if (right.length < n) {return right.concat(quickselect(left, n - right.length))}
        return quickselect(right, n)
    }
    return quickselect(keys, k)
};

/**
 * Bucket sort is another option
 * Put all the values from tally into an array, so you that
 * bucket[m] contains those elements that appeared m times
 * iterate down from highest possible m to put in k elements
 for (let i = nums.length; i >= 0 && k > 0; k--) {
        while (bucket[i].length === 0) i--;
        result.push(bucket[i].shift());
    }
 * or use a heap
 */

const tests = [
    { nums: [1, 1, 1, 2, 2, 3], k: 2, out: [1, 2] },
    { nums: [1, 1, 1, 2, 2, 3, 3, 3, 3], k: 2, out: [1, 3] },
    { nums: [1, 1, 1, 2, 2, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 10, 10, 11, 12], k: 5, out: [1, 10, 2, 6, 9] },
    { nums: [1], k: 1, out: [1] }
]

tests.forEach((t, i) => console.log(
    'test', i, topKFrequent(t.nums, t.k), 'should be', t.out
))