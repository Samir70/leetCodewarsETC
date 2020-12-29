const { bigArray, bigK } = require('./4-bigtest');

const minMoves = (nums, k) => {
    let memo = {}
    const sum = (arr, start, finish) => {
        let key = [start, finish].join(',');
        if (memo[key]) {return memo[key]}
        let out = 0;
        let i = start;
        while (i <= finish) { out += arr[i]; i++ }
        memo[key] = out
        return out
    }
    if (k === 1) { return 0 }
    const gaps = [];
    // console.log(nums.join(''))
    let i = 0;
    // never want to jump past the zeros at the front
    while (nums[i] === 0) { i++ }
    // now i points to the first one, start measuring gaps from next element
    i++;
    let zeros = 0
    while (i < nums.length) {
        if (nums[i] === 0) {
            zeros++
        } else {
            gaps.push(zeros)
            zeros = 0
        }
        i++
    }
    // console.log('gaps:', gaps);
    // we need to consider k-1 gaps at a time
    if (k === 2) { return Math.min(...gaps) }
    let best = Infinity;
    let left = 0, mid = Math.floor((k-1)/2), right = k-2
    while (right < gaps.length) {
        let cur = 0;
        let i = left;
        while (i < mid) {cur += sum(gaps, i, mid-1); i++}
        while (i <= right) {cur += sum(gaps, mid, i); i++}
        // console.log(cur);
        left++; mid++; right++;
        best = Math.min(best, cur)
    }
    return best
}

const tests = [
    { nums: [1, 0, 0, 1, 0, 1], k: 2, out: 1 },
    { nums: [1, 0, 0, 0, 0, 0, 1, 1], k: 3, out: 5 },
    { nums: [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1], k: 4, out: 4 },
    { nums: [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], k: 5, out: 6 },
    { nums: [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], k: 7, out: 15 },
    { nums: bigArray, k: bigK, out: 89860 }
]

tests.forEach((t, i) => console.log(
    'test', i, minMoves(t.nums, t.k), 'should be', t.out
))